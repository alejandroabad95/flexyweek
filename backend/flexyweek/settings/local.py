# backend/flexyweek/settings/local.py
from .base import *

# Activar el modo de depuración
DEBUG = True

# Establecer hosts permitidos en el entorno de desarrollo
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Configuración de la base de datos para el entorno de desarrollo
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('LOCAL_DB_NAME', 'flexyweek_db'),
        'USER': os.getenv('LOCAL_DB_USER', 'postgres'),
        'PASSWORD': os.getenv('LOCAL_DB_PASSWORD', ''),
        'HOST': os.getenv('LOCAL_DB_HOST', 'localhost'),
        'PORT': os.getenv('LOCAL_DB_PORT', '5432'),
    }
}

# Configuración para CORS en el entorno de desarrollo
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]

# Configuración adicional para Celery local
CELERY_BROKER_URL = os.getenv('LOCAL_CELERY_BROKER_URL', 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = os.getenv('LOCAL_CELERY_RESULT_BACKEND', 'redis://localhost:6379/0')
