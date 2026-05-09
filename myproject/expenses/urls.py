from django.urls import path
from . import views


urlpatterns = [
    path('add/', views.add_expense, name='add_expense'),
    path('list/', views.list_expenses, name='list_expenses'),
    path('update/<int:expense_id>/', views.update_expense, name='update_expense'),
    path('delete/<int:expense_id>/', views.delete_expense, name='delete_expense'),
    path('report/', views.expense_report, name='expense_report'),
]