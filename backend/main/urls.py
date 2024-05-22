from django.urls import path, include
from .views import ActivityList, ActivityCreate, ActivityUpdate, ActivityDelete, EventCreate, EventList, EventTodayList, EventCompletedList, EventNextList, ToggleEventCompleted, ToggleEventDay, UpdateEventPosition, EventUpdateInfo, EventDelete # Importa las vistas correctamente

urlpatterns = [

    path('auth/', include('authentication.urls')),
    # Actividades
    path('activities/', ActivityList.as_view(), name='activity-list'),
    path('activities/create/', ActivityCreate.as_view(), name='activity-create'),
    path('activities/<int:pk>/update/', ActivityUpdate.as_view(), name='activity-update'),
    path('activities/<int:pk>/delete/', ActivityDelete.as_view(), name='activity-delete'),
    # Eventos
    path('events/create/', EventCreate.as_view(), name='event-create'),
    path('events/', EventList.as_view(), name='event-list'),
    path('events/today/', EventTodayList.as_view(), name='event-today-list'), # eventos hoy
    path('events/completed/', EventCompletedList.as_view(), name='event-completed-list'), # eventos completados
    path('events/next/', EventNextList.as_view(), name='event-next-list'), # eventos próximos hasta el domingo
    path('events/<int:pk>/toggle-completed/', ToggleEventCompleted.as_view(), name='toggle-event-completed'), # Actualiza los eventos como completados o no
    path('events/<int:pk>/<str:direction>/toggle-day/', ToggleEventDay.as_view(), name='toggle-event-day'), # Cambiar el día del evento
    path('events/<int:pk>/update/', EventUpdateInfo.as_view(), name='event-update'), # Actualiza la actividad y objetivo del evento
    path('events/<int:pk>/update-position/', UpdateEventPosition.as_view(), name='update-event-position'),

    path('events/<int:pk>/delete/', EventDelete.as_view(), name='event-delete'), # Eliminar evento

]
