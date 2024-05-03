from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import logout
from django.contrib.auth.models import User
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer

# Create your views here.

# Autenticación con Tokens

class AuthInfoApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LoginApiView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = User.objects.filter(username=username).first()
        if user is None or not user.check_password(password):
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

        # Autenticar al usuario y generar el token de autenticación. En Knox por defecto la Key es Token 
        _, token = AuthToken.objects.create(user)
        return Response({'token': token}, status=status.HTTP_200_OK)


class RegisterApiView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Autenticar al usuario y generar el token de autenticación
            _, token = AuthToken.objects.create(user)
            return Response({'token': token}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutApiView(APIView):
    def post(self, request):
        # Cerrar sesión del usuario
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
