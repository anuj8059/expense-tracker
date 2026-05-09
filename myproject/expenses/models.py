from django.db import models

# Create your models here.

class Expense(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    expenseDate = models.DateField()
    expenseItem = models.CharField(max_length=255)
    expenseAmount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField( auto_now_add=True)

    def __str__(self):
        return f"{self.expenseItem} - {self.expenseAmount} on {self.date}"