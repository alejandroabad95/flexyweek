# main_app/tasks.py

from celery import Celery
from django.utils import timezone
from .models import Event

app = Celery('flexyweek')

@app.task
def unmark_completed_events():
    # Obtener todos los eventos completados que deben desmarcarse
    events_to_unmark = Event.objects.filter(completed=True)

    # Desmarcar los eventos completados
    for event in events_to_unmark:
        event.completed = False
        event.save()

    # Información para registro o debugging
    return f'Unmarked {len(events_to_unmark)} completed events.'
