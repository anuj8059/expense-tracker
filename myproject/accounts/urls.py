from django.urls import path
from .views import change_password, me, register

urlpatterns = [
    path("register/", register),
    path("me/", me),
    path("change-password/", change_password),
]