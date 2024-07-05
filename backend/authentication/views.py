from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import logout, update_session_auth_hash
from django.contrib.auth.models import User

from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, ChangePasswordSerializer

from knox.models import AuthToken
from knox.auth import TokenAuthentication

# Create your views here.

# Autenticación con Tokens

class AuthInfoApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class RegisterApiView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Autenticar al usuario y generar el token de autenticación
            _, token = AuthToken.objects.create(user)
            return Response({'token': token}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CountUsersApiView(APIView):
    def get(self, request):
        user_count = User.objects.count()
        return Response({'count': user_count}, status=status.HTTP_200_OK)


class LoginApiView(APIView):
    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')

            user = User.objects.filter(username=username).first()

            # Si no se encuentra por nombre de usuario, buscar por email
            if not user:
                user = User.objects.filter(email=username).first()

            # Verificar las credenciales
            if user is None or not user.check_password(password):
                return Response({'error': 'Nombre de usuario o contraseña incorrectos'}, status=status.HTTP_401_UNAUTHORIZED)
            
            # Autenticar al usuario y generar el token de autenticación. En Knox por defecto la Key es Token 
            _, token = AuthToken.objects.create(user)
            return Response({'token': token}, status=status.HTTP_200_OK)
        
        except Exception as e:
            # Para cualquier otro tipo de error, responder con un error interno del servidor
            return Response({'error': 'Error interno del servidor'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class ChangePasswordApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            if not user.check_password(serializer.data.get("old_password")):
                return Response({"old_password": "Wrong password."}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data.get("new_password"))
            user.save()
            update_session_auth_hash(request, user)  # Mantiene la sesión después del cambio de contraseña
            return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class LogoutApiView(APIView):
    def post(self, request):
        # Cerrar sesión del usuario
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


class DeleteAccountApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        logout(request)
        return Response({"message": "Account deleted successfully"}, status=status.HTTP_200_OK)