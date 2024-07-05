# serializers.py

import re
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},  # La contraseña no será devuelta en las respuestas
            'username': {'min_length': 3}  # Mínimo de 3 caracteres para el nombre de usuario
        }

    def validate_username(self, value):

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya está en uso. Por favor, elige otro.")
        return value
    

    def validate_email(self, value):
        """
        Verifica que el correo electrónico tenga un formato válido y que sea único.
        """
        # Verificar formato del email
        if not re.match(r"[^@]+@[^@]+\.[^@]+", value):
            raise serializers.ValidationError("El formato del correo electrónico no es válido.")
        
        # Verificar unicidad del email
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo electrónico ya está en uso. Por favor, elige otro.")
        
        return value




    # VALIDACIÖN CONTRASEÑA ESPECIAL???
    # def validate_password(self, value):
    #     """
    #     Verifica que la contraseña cumpla con los requisitos de complejidad.
    #     """
    #     # Usar la validación de contraseña de Django
    #     validate_password(value)
    #     return value


    def validate(self, data):
        """
        Verifica que todos los campos requeridos estén presentes y no estén vacíos.
        """
        required_fields = ['username', 'password', 'email']
        for field in required_fields:
            if not data.get(field):
                raise serializers.ValidationError(f"El campo '{field}' es obligatorio.")
        return data

    def create(self, validated_data):
        """
        Crea un nuevo usuario con la contraseña encriptada.
        """
        user = User.objects.create_user(**validated_data)
        return user

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        """
        Verifica que la nueva contraseña cumpla con los requisitos de complejidad.
        """
        # Validar la nueva contraseña usando la validación de Django
        validate_password(value)
        return value

    def validate(self, data):
        """
        Verifica que la nueva contraseña sea diferente a la antigua.
        """
        old_password = data.get('old_password')
        new_password = data.get('new_password')

        if old_password == new_password:
            raise serializers.ValidationError("La nueva contraseña no puede ser igual a la anterior.")

        return data