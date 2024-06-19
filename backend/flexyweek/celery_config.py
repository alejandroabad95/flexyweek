# celery_config.py

from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab  # Ajuste en la importación para `crontab`

# Establece la configuración de Django para Celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'flexyweek.settings')

# Crea una instancia de Celery
app = Celery('flexyweek')

# Carga la configuración de Celery desde el archivo settings.py
app.config_from_object('django.conf:settings', namespace='CELERY')

# Autodiscover tasks de todas las aplicaciones listadas en INSTALLED_APPS de settings.py
app.autodiscover_tasks()

# Define las tareas programadas (beat schedule)
app.conf.beat_schedule = {
    'desmarcar-eventos-cada-domingo': {
        'task': 'main.tasks.unmark_completed_events',
        'schedule': crontab(hour=0, minute=0, day_of_week=0),  # Ejecutar todos los domingos a la medianoche (0:00 AM)
    },
}
