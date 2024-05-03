from knox.auth import TokenAuthentication
from rest_framework import permissions, generics
from .models import Activity, Event
from .serializers import ActivitySerializer, EventSerializer
from django.utils import timezone


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


# Actualiza el día de los eventos



class EventCreate(generics.CreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        # Asignar el usuario autenticado como creador de la actividad
        serializer.save(user=self.request.user)

class EventUpdate(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        # Filtrar las actividades por el usuario autenticado
        return Event.objects.filter(user=self.request.user)
    
class EventDelete(generics.DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        # Filtrar las actividades por el usuario autenticado
        return Event.objects.filter(user=self.request.user)