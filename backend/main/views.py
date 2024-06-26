from .models import Activity, Event
from .serializers import ActivitySerializer, EventSerializer
from rest_framework import permissions, generics
from rest_framework.response import Response
from django.utils import timezone
from rest_framework import status
from knox.auth import TokenAuthentication
from django.db.models import Case, When, Value, BooleanField


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
        activity_id = self.request.data.get('activity')  # Asegúrate de obtener el ID de la actividad
        serializer.save(user=self.request.user, activity_id=activity_id)

# Muestra todos los eventos de un usuario
class EventList(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        # Filtrar las actividades por el usuario autenticado
        
        return Event.objects.filter(user=self.request.user)
    

# Muestra todos los eventos pasados

class EventPastList(generics.ListAPIView):
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

        # Si el día actual no es domingo, mostrar eventos desde el lunes hasta el día anterior al día actual
        if current_day_index > 0:
            past_days = days_of_week[:current_day_index]
        else:
            past_days = []  # No mostrar eventos si el día actual es domingo

        # Filtra los eventos cuyo día esté en la lista de días pasados
        queryset = Event.objects.filter(user=self.request.user, day__in=past_days)

        # Ordenar primero por día y luego por prioridad dentro de cada día
        queryset = sorted(queryset, key=lambda x: (past_days.index(x.day), x.priority))

        return queryset


# Muestra todos los eventos actuales
class EventTodayList(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        today = timezone.now().strftime('%a')
        
        # Filtrar eventos por usuario, día actual y ordenarlos según la lógica especificada
        return Event.objects.filter(user=self.request.user, day=today).annotate(
            completed_order=Case(
                When(completed=True, then=Value(True)),
                default=Value(False),
                output_field=BooleanField()
            )
        ).order_by('completed_order', 'priority', '-completed_at')
    


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
        queryset = Event.objects.filter(user=self.request.user, day__in=next_days)

        # Ordenar primero por día y luego por prioridad dentro de cada día
        queryset = sorted(queryset, key=lambda x: (next_days.index(x.day), x.priority))

        return queryset

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
            # Variable para indicar si se encontraron prioridades disponibles
            found_priorities = False
            
            # Iterar sobre los días siguientes
            for i in range(1, len(days_of_week)):  # Empezamos desde 1 para saltar el día actual
                # Calcular el índice del siguiente día
                next_day_index = (current_day_index + i) % len(days_of_week)
                # Obtener el nombre del siguiente día
                next_day_name = days_of_week[next_day_index]

                # Obtener eventos del siguiente día ordenados por prioridad descendente
                existing_events = Event.objects.filter(
                    user=event.user,
                    day=next_day_name
                ).order_by('-priority')

                # Obtener las prioridades disponibles en el siguiente día
                available_priorities = set(range(1, 7)) - set(event.priority for event in existing_events)

                # Si hay prioridades disponibles, seleccionar la más alta
                if available_priorities:
                    highest_priority = min(available_priorities)
                    print("La prioridad más alta disponible es:", highest_priority)
                    event.day = next_day_name
                    event.priority = highest_priority
                    event.save()

                    found_priorities = True

                    data = {
                        'message': 'El evento se ha movido al siguiente día disponible con la prioridad más alta.',
                        'event': EventSerializer(event).data
                    }

                    break  # Salir del bucle si se encuentran prioridades disponibles en algún día

            # Si no se encontraron prioridades disponibles en ningún día
            if not found_priorities:
                print("No hay prioridades disponibles en ningún día")
           
           

        elif direction == 'previous':
            # Calcular el índice del día anterior
            # previous_day_index = (current_day_index - 1) % len(days_of_week)
            # Actualizar el día del evento al día anterior
            # event.day = days_of_week[previous_day_index]

            # Variable para indicar si se encontraron prioridades disponibles
            found_priorities = False

            # Iterar sobre los días anteriores
            for i in range(1, len(days_of_week)):  # Empezamos desde 1 para saltar el día actual
                # Calcular el índice del día anterior
                previous_day_index = (current_day_index - i) % len(days_of_week)
                # Obtener el nombre del día anterior
                previous_day_name = days_of_week[previous_day_index]

                # Obtener eventos del día anterior ordenados por prioridad descendente
                existing_events = Event.objects.filter(
                    user=event.user,
                    day=previous_day_name
                ).order_by('-priority')

                # Obtener las prioridades disponibles en el día anterior
                available_priorities = set(range(1, 7)) - set(event.priority for event in existing_events)

                # Si hay prioridades disponibles, seleccionar la más alta
                if available_priorities:
                    highest_priority = min(available_priorities)
                    event.day = previous_day_name
                    event.priority = highest_priority
                    event.save()

                    found_priorities = True

                    data = {
                        'message': 'El evento se ha movido al día anterior disponible con la prioridad más alta.',
                        'event': EventSerializer(event).data
                    }

                    return Response(data)

            # Si no se encontraron prioridades disponibles en ningún día anterior
            if not found_priorities:
                return Response(
                    {'message': 'No hay prioridades disponibles en ningún día anterior.'},
                    status=status.HTTP_200_OK
                )

        else:
            return Response({'error': 'Invalid direction'}, status=status.HTTP_400_BAD_REQUEST)


        # Retornar la respuesta con los datos serializados del evento actualizado
        return Response(self.get_serializer(event).data)




# NUEVOOOOOOOOOOOOOO
class UpdateEventPosition(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def update(self, request, *args, **kwargs):
        event1_id = request.data.get('event1Id')
        event2_id = request.data.get('event2Id')

        try:
            event1 = Event.objects.get(pk=event1_id)
            event2 = Event.objects.get(pk=event2_id)

            # Realizar el intercambio de días y prioridades
            event1.day, event2.day = event2.day, event1.day
            event1.priority, event2.priority = event2.priority, event1.priority

            event1.save()
            event2.save()

            serializer1 = self.get_serializer(event1)
            serializer2 = self.get_serializer(event2)

            return Response({'event1': serializer1.data, 'event2': serializer2.data})
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
        new_activity_id = request.data.get('activity')
        new_goal = request.data.get('goal')

        try:
            # Parcialmente actualizar los campos activity y goal del evento
            instance.activity_id = new_activity_id
            instance.goal = new_goal
            instance.save()

            # Devolver el evento actualizado como respuesta
            serializer = self.get_serializer(instance)
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