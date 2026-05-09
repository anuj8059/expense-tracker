from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate



@api_view(["POST"])
def register(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created"})

    return Response(serializer.errors)



@api_view(["POST"])
def login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=401)

    refresh = RefreshToken.for_user(user)

    access_token = str(refresh.access_token)

    response = Response({"message": "Login successful"})

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True
    )

    return response


from rest_framework.decorators import api_view
from rest_framework.response import Response
import jwt
from django.conf import settings


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):

    token = request.COOKIES.get("access_token")

    if not token:
        return Response({"error": "Not authenticated"}, status=401)

    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])

    return Response({"user_id": payload["user_id"]})


@api_view(["POST"])
def logout(request):

    response = Response({"message": "Logged out"})
    response.delete_cookie("access_token")

    return response
