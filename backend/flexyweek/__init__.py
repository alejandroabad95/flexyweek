import os

# Verificar si la aplicación está en producción o en desarrollo
ENVIRONMENT = os.getenv('DJANGO_ENV', 'DJANGO_ENV')

if ENVIRONMENT == 'production':
    from celery import app as celery_app
    __all__ = ('celery_app',)


