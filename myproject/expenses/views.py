import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth.decorators import login_required

from rest_framework.decorators import api_view

from .models import Expense

@api_view(['POST'])
def add_expense(request):
    print("Add expense called")
    if request.method != "POST":
        return JsonResponse(
            {"error": "Invalid request method"},
            status=405
        )

    try:

        data = json.loads(request.body)
        item = data.get("item")
        amount = data.get("amount")
        date = data.get("date")

        if not item or not amount or not date:
            return JsonResponse(
                {"error": "All fields are required"},
                status=400
            )


        expense = Expense.objects.create(
            user=request.user,   # 🔥 comes from session middleware
            expenseItem=item,
            expenseAmount=amount,
            expenseDate=date
        )

        return JsonResponse({
            "message": "Expense added successfully",
            "expense": {
                "id": expense.id,
                "item": expense.expenseItem,
                "amount": str(expense.expenseAmount),
                "date": expense.expenseDate,
                "created_at": expense.date
            }
        }, status=201)

    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Invalid JSON"},
            status=400
        )

def list_expenses(request):
    if request.method != "GET":
        return JsonResponse(
            {"error": "Invalid request method"},
            status=405
        )

    try:
        if not request.user.is_authenticated:
            return JsonResponse(
                {"error": "Authentication required"},
                status=401
            )
        
        expenses = Expense.objects.filter(user=request.user).order_by('-date').values(
            'id', 'expenseItem', 'expenseAmount', 'expenseDate', 'date'
        )   
        
        print(expenses)
        return JsonResponse({
            "expenses": list(expenses)
        }, status=200)

    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )
    
@csrf_exempt
def update_expense(request, expense_id):    
    if request.method != "PUT":
        return JsonResponse(
            {"error": "Invalid request method"},
            status=405
        )

    try:
        if not request.user.is_authenticated:
            return JsonResponse(
                {"error": "Authentication required"},
                status=401
            )
        
        data = json.loads(request.body)

        item = data.get("item")
        amount = data.get("amount")
        date = data.get("date")

        if not item or not amount or not date:
            return JsonResponse(
                {"error": "All fields are required"},
                status=400
            )

        try:
            expense = Expense.objects.get(id=expense_id, user=request.user)
        except Expense.DoesNotExist:
            return JsonResponse(
                {"error": "Expense not found"},
                status=404
            )

        expense.expenseItem = item
        expense.expenseAmount = amount
        expense.expenseDate = date
        expense.save()

        return JsonResponse({
            "message": "Expense updated successfully",
            "expense": {
                "id": expense.id,
                "item": expense.expenseItem,
                "amount": str(expense.expenseAmount),
                "date": expense.expenseDate,
                "created_at": expense.date
            }
        }, status=200)

    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Invalid JSON"},
            status=400
        )
    

@csrf_exempt
def delete_expense(request, expense_id):
    if request.method != "DELETE":
        return JsonResponse(
            {"error": "Invalid request method"},
            status=405
        )

    try:

        expense = Expense.objects.get(id=expense_id, user=request.user)

        expense.delete()

        return JsonResponse({
            "message": "Expense deleted successfully"
        }, status=200)

    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )
    
def expense_report(request):
    if request.method != "GET":
        return JsonResponse(
            {"error": "Invalid request method"},
            status=405
        )

    try:
        if not request.user.is_authenticated:
            return JsonResponse(
                {"error": "Authentication required"},
                status=401
            )
        
        from_date = request.GET.get("from_date")
        to_date = request.GET.get("to_date")

        if not from_date or not to_date:
            return JsonResponse(
                {"error": "Both from_date and to_date are required"},
                status=400
            )

        expenses = Expense.objects.filter(
            user=request.user,
            expenseDate__range=[from_date, to_date]
        ).values('expenseItem', 'id', 'expenseAmount', 'expenseDate', 'date')
        print(expenses)
        return JsonResponse({
            "expenses": list(expenses),
        }, status=200)
       

    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )
