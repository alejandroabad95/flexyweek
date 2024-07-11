# main_app/tasks.py

from .models import Event
from celery_config import app

@app.task

def unmark_completed_events():
    # Obtener todos los eventos completados
    events_to_unmark = Event.objects.filter(completed=True)

    for event in events_to_unmark:
        # Obtener el tipo de actividad del evento
        activity_type_id = event.activity.activity_type.id

        if activity_type_id == 1:
            # Si es un hábito, desmarcar el evento como completado
            event.completed = False
            event.save()
            
        elif activity_type_id == 2:
            # Si es una tarea, eliminar el evento
            event.delete()
           
    # Información para registro o debugging
    return f'Processed completed events.'

# def unmark_completed_events():
#     # Obtener todos los eventos completados que deben desmarcarse
#     events_to_unmark = Event.objects.filter(completed=True)

#     # Desmarcar los eventos completados
#     for event in events_to_unmark:
#         event.completed = False
#         event.save()

#     # Información para registro o debugging
#     return f'Unmarked {len(events_to_unmark)} completed events.'
