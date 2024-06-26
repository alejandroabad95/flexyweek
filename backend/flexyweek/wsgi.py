"""
WSGI config for flexyweek project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'flexyweek.settings')

# Obtén el entorno desde la variable de entorno DJANGO_ENV
# environment = os.getenv('DJANGO_ENV', 'local')
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', f'flexyweek.settings.{environment}')

application = get_wsgi_application()
