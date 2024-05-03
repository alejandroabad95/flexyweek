from django.urls import path, include
from .views import ActivityList, ActivityCreate, ActivityUpdate, ActivityDelete, EventTodayList, EventCompletedList, EventNextList # Importa las vistas correctamente

urlpatterns = [

    path('auth/', include('authentication.urls')),
    # Actividades
    path('activities/', ActivityList.as_view(), name='activity-list'),
    path('activities/create/', ActivityCreate.as_view(), name='activity-create'),
    path('activities/<int:pk>/update/', ActivityUpdate.as_view(), name='activity-update'),
    path('activities/<int:pk>/delete/', ActivityDelete.as_view(), name='activity-delete'),
    # Eventos




    path('events/today/', EventTodayList.as_view(), name='event-today-list'), # eventos hoy
    path('events/completed/', EventCompletedList.as_view(), name='event-completed-list'), # eventos completados
    path('events/next/', EventNextList.as_view(), name='event-next-list'), # eventos próximos hasta el domingo
  


]
