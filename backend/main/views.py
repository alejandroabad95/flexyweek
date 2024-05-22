from knox.auth import TokenAuthentication
from rest_framework import permissions, generics
from rest_framework.response import Response
from .models import Activity, Event
from .serializers import ActivitySerializer, EventSerializer
from django.utils import timezone
from rest_framework import status


# ACTIVIDADES

class ActivityList(generics.ListAPIView):
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        # Filtrar las actividades por el usuario autenticado
        return Activity.objects.filter(user=self.request.user)

class ActivityCreate(generics.CreateAPIView):
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        # Asignar el usuario autenticado como creador de la actividad
        serializer.save(user=self.request.user)

class ActivityUpdate(generics.UpdateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        # Filtrar las actividades por el usuario autenticado
        return Activity.objects.filter(user=self.request.user)
    
class ActivityDelete(generics.DestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        # Filtrar las actividades por el usuario autenticado
        return Activity.objects.filter(user=self.request.user)
    


# EVENTOS

# Crea eventos
class EventCreate(generics.CreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        # Asignar el usuario autenticado como creador de la actividad
        serializer.save(user=self.request.user)


# Muestra todos los eventos de un usuario
class EventList(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        # Filtrar las actividades por el usuario autenticado
        
        return Event.objects.filter(user=self.request.user)


# Muestra todos los eventos de un usuario el día de hoy
class EventTodayList(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        # Obtener el día de la semana actual en inglés
        today = timezone.now().strftime('%a')
        # Filtrar los eventos por el usuario autenticado y el día de hoy
        return Event.objects.filter(user=self.request.user, day=today, completed=False)

# Muestra todos los eventos de un usuario completados
class EventCompletedList(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        # Filtrar los eventos por el usuario autenticado y marcados como completados
        return Event.objects.filter(user=self.request.user, completed=True)
    
# Muestra todos los eventos próximos
class EventNextList(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
         # Obtén el día actual en el formato de tu modelo Event
        today = timezone.now().strftime('%a')

        # Lista de días de la semana en orden
        days_of_week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

        # Encuentra el índice del día actual en la lista
        current_day_index = days_of_week.index(today)

        # Si el día actual es miércoles o anterior, mostrar eventos desde hoy hasta el domingo
        if current_day_index < days_of_week.index('Sun'):
            next_days = days_of_week[current_day_index + 1:] 
        else:
            next_days = []  # No mostrar eventos si el día actual es posterior a domingo

        # Filtra los eventos cuyo día esté en la lista de días siguientes
        return Event.objects.filter(user=self.request.user, day__in=next_days)

# Actualiza los eventos como completados o no

class ToggleEventCompleted(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def update(self, request, *args, **kwargs):
        event = self.get_object()
        # Toggle the 'completed' status of the event
        event.completed = not event.completed
        event.save()
        return Response(self.get_serializer(event).data)

    def get_queryset(self):
        # Filtrar los eventos por el usuario autenticado
        return Event.objects.filter(user=self.request.user)

# Actualiza el día de los eventos

class ToggleEventDay(generics.UpdateAPIView):  # Cambia a UpdateAPIView
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def update(self, request, *args, **kwargs):
        event = self.get_object()
        direction = kwargs.get('direction')  # Obtener la dirección del día desde los argumentos de la URL

        # Obtener la lista de días de la semana en el orden definido en DAY_CHOICES
        days_of_week = [day[0] for day in Event.DAY_CHOICES]
        
        current_day_index = days_of_week.index(event.day)

        if direction == 'next':
            # Calcular el índice del siguiente día
            next_day_index = (current_day_index + 1) % len(days_of_week)
            # Actualizar el día del evento al siguiente día
            event.day = days_of_week[next_day_index]
        elif direction == 'previous':
            # Calcular el índice del día anterior
            previous_day_index = (current_day_index - 1) % len(days_of_week)
            # Actualizar el día del evento al día anterior
            event.day = days_of_week[previous_day_index]
        else:
            return Response({'error': 'Invalid direction'}, status=status.HTTP_400_BAD_REQUEST)

        # Guardar los cambios en el evento
        event.save()

        # Retornar la respuesta con los datos serializados del evento actualizado
        return Response(self.get_serializer(event).data)

# Actualiza la posición de los eventos

class UpdateEventPosition(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def update(self, request, *args, **kwargs):
       
        instance = self.get_object()
        new_day = request.data.get('new_day')
        new_priority = request.data.get('new_priority')

        try:
            # Actualizar los campos necesarios del evento
            instance.day = new_day
            instance.priority = new_priority
            instance.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    



# Actualiza información de los eventos

class EventUpdateInfo(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        # Obtener los nuevos datos de activity y goal de la solicitud HTTP
        new_activity = request.data.get('activity')
        new_goal = request.data.get('goal')

        try:
            # Parcialmente actualizar los campos activity y goal del evento
            partial_data = {'activity': new_activity, 'goal': new_goal}
            serializer = self.get_serializer(instance, data=partial_data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # Devolver el evento actualizado como respuesta
            return Response(serializer.data)
        except Exception as e:
            # Manejo de errores
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Elimina eventos

class EventDelete(generics.DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)