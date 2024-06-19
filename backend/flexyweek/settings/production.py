# backend/flexyweek/settings/production.py

from .base import *

# Desactivar el modo de depuración en producción
DEBUG = False

# Establecer hosts permitidos en el entorno de producción
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')

# Configuración de la base de datos para el entorno de producción
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.getenv('PROD_DB_HOST'),
       
    }
}

# Configuración para CORS en el entorno de producción
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '').split(',')

# Configuración de archivos estáticos en producción

# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# STATIC_URL = '/static/'

# Seguridad adicional
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'
SECURE_SSL_REDIRECT = True

# Configuración adicional para Celery production
CELERY_BROKER_URL = os.getenv('PROD_CELERY_BROKER_URL', 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = os.getenv('PROD_CELERY_RESULT_BACKEND', 'redis://localhost:6379/0')
