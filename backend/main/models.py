from django.db import models
from django.contrib.auth.models import User
from django.forms import ValidationError
from django.utils import timezone

# Create your models here.

class ActivityType (models.Model):
    id = models.IntegerField(primary_key=True, verbose_name="ID")
    name = models.CharField(max_length=100, verbose_name="nombre")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Tipo de actividad'
        verbose_name_plural = 'Tipos de actividad'
    
class Activity(models.Model):
    name = models.CharField(max_length=100, verbose_name="nombre")
    activity_type = models.ForeignKey(ActivityType, on_delete=models.CASCADE, verbose_name="tipo" )
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=False, verbose_name="usuario")  # editable=False para que no se muestre en el formulario
    created_at = models.DateTimeField(default=timezone.now, verbose_name="fecha de creación")  # Fecha de creación

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Actividad'
        verbose_name_plural = 'Actividades'
      
        

class Event(models.Model):
    DAY_CHOICES = [
        ('Mon', 'Lunes'),
        ('Tue', 'Martes'),
        ('Wed', 'Miércoles'),
        ('Thu', 'Jueves'),
        ('Fri', 'Viernes'),
        ('Sat', 'Sábado'),
        ('Sun', 'Domingo'),
    ]

    activity = models.ForeignKey(Activity, on_delete=models.CASCADE,verbose_name="actividad" )
    goal = models.CharField(max_length=200, verbose_name="objetivo")
    priority = models.IntegerField(default=1, verbose_name="prioridad", editable=False)
    day = models.CharField(max_length=3, choices=DAY_CHOICES, verbose_name="día")
    completed = models.BooleanField(default=False, verbose_name="completado")  # Campo booleano para evento completado
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)  # editable=False para que no se muestre en el formulario

    def save(self, *args, **kwargs):
        PRIORITY_MAX = 3
        if not self.pk:  # Only for new events
            # Count existing events for the same user and day of the week
            existing_events = Event.objects.filter(
                user=self.user,
                day=self.day
            ).order_by('priority')

            # If there are already enough events, raise an error
            if existing_events.count() >= PRIORITY_MAX:
                raise ValidationError("El número máximo de eventos por día ha sido alcanzado")

            # Assign the next available priority
            used_priorities = [event.priority for event in existing_events]
            available_priorities = set(range(1, PRIORITY_MAX + 1)) - set(used_priorities)
            if available_priorities:
                self.priority = min(available_priorities)
            else:
                raise ValidationError("No hay prioridades disponibles para este día")

        super().save(*args, **kwargs)

    def __str__(self):
        return self.goal
    
    class Meta:
        verbose_name = 'Evento'
        verbose_name_plural = 'Eventos'

