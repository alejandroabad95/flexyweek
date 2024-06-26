# backend/flexyweek/settings/production.py

from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY', 'SECRET_KEY')

# Desactivar el modo de depuración en producción
DEBUG = False

# Establecer hosts permitidos en el entorno de producción
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.getenv('PROD_DB_HOST'),
        'NAME': os.getenv('PROD_DB_NAME'),
        'USER': os.getenv('PROD_DB_USER'),
        'PASSWORD': os.getenv('PROD_DB_PASSWORD'),
        'PORT': os.getenv('PROD_DB_PORT'),
    }
}

# Configuración para CORS en el entorno de producción
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '').split(',')

# Configuración para CORS en el entorno de producción
CSRF_TRUSTED_ORIGINS = os.getenv('CSRF_TRUSTED_ORIGINS', '').split(',')


# Seguridad adicional
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'
# SECURE_SSL_REDIRECT = True

# Configuración adicional para Celery production
CELERY_BROKER_URL = os.getenv('PROD_CELERY_BROKER_URL', 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = os.getenv('PROD_CELERY_RESULT_BACKEND', 'redis://localhost:6379/0')


# Configuración de archivos estáticos
# Static files (CSS, JavaScript, Images)
STATIC_ROOT = BASE_DIR / 'staticfiles'

# WhiteNoise configuration
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'