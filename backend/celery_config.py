# celery_config.py

from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

# Establecer la configuración de Django para Celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'flexyweek.settings')

# Crear una instancia de Celery
app = Celery('flexyweek')

# Cargar la configuración de Celery desde el archivo settings.py
app.config_from_object('django.conf:settings', namespace='CELERY')

# Autodiscover tasks de todas las aplicaciones listadas en INSTALLED_APPS de settings.py
app.autodiscover_tasks()

# Configuración específica para Celery 6.0 y superior
app.conf.broker_connection_retry_on_startup = True  # Para mantener el comportamiento de reintentos al inicio

# Define las tareas programadas (beat schedule)
app.conf.beat_schedule = {
    'desmarcar-eventos-cada-domingo': {
        'task': 'main.tasks.unmark_completed_events',
        'schedule': crontab(hour=6, minute=0, day_of_week=1),  # Ejecutar todos los lunes a las 6 de la mañana (6:00 AM)
    },
}
