from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Expense
from .serializers import ExpenseSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_expense(request):
    item = request.data.get("item")
    amount = request.data.get("amount")
    date = request.data.get("date")

    if not item or not amount or not date:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    expense = Expense.objects.create(
        user=request.user,
        expenseItem=item,
        expenseAmount=amount,
        expenseDate=date,
    )
    serializer = ExpenseSerializer(expense)
    return Response(
        {"message": "Expense added successfully", "expense": serializer.data},
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_expenses(request):
    expenses = Expense.objects.filter(user=request.user).order_by("-date")
    serializer = ExpenseSerializer(expenses, many=True)
    return Response({"expenses": serializer.data}, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_expense(request, expense_id):
    try:
        expense = Expense.objects.get(id=expense_id, user=request.user)
    except Expense.DoesNotExist:
        return Response({"error": "Expense not found"}, status=status.HTTP_404_NOT_FOUND)

    item = request.data.get("item")
    amount = request.data.get("amount")
    date = request.data.get("date")
    if not item or not amount or not date:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    expense.expenseItem = item
    expense.expenseAmount = amount
    expense.expenseDate = date
    expense.save()

    serializer = ExpenseSerializer(expense)
    return Response(
        {"message": "Expense updated successfully", "expense": serializer.data},
        status=status.HTTP_200_OK,
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_expense(request, expense_id):
    try:
        expense = Expense.objects.get(id=expense_id, user=request.user)
    except Expense.DoesNotExist:
        return Response({"error": "Expense not found"}, status=status.HTTP_404_NOT_FOUND)

    expense.delete()
    return Response({"message": "Expense deleted successfully"}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def expense_report(request):
    from_date = request.query_params.get("from_date")
    to_date = request.query_params.get("to_date")
    if not from_date or not to_date:
        return Response(
            {"error": "Both from_date and to_date are required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    expenses = Expense.objects.filter(
        user=request.user,
        expenseDate__range=[from_date, to_date],
    ).order_by("-date")
    serializer = ExpenseSerializer(expenses, many=True)
    return Response({"expenses": serializer.data}, status=status.HTTP_200_OK)
