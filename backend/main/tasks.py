# main_app/tasks.py

from .models import Event
from celery_config import app

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
