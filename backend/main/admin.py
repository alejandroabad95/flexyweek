from django.contrib import admin
from django.forms import ValidationError
from .models import ActivityType, Activity, Event

# Registro de los modelos ActivityType y Activity

class ActivityTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class ActivityAdmin(admin.ModelAdmin):
    list_display = ('name', 'activity_type', 'user')

    def get_queryset(self, request):
        # Filtra las actividades para que solo el usuario actual vea las suyas
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        return queryset.filter(user=request.user)

    def save_model(self, request, obj, form, change):
        # Asignar el usuario actual a la actividad antes de guardarla
        obj.user = request.user
        super().save_model(request, obj, form, change)

class EventAdmin(admin.ModelAdmin):
    list_display = ('day', 'activity', 'goal', 'priority', 'user')
    
    def get_queryset(self, request):
        # Filtra los eventos para que solo el usuario actual vea los suyos
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        return queryset.filter(user=request.user)
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        # Filtra las actividades para que solo el usuario actual vea las suyas
        if db_field.name == 'activity':
            kwargs['queryset'] = Activity.objects.filter(user=request.user)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def save_model(self, request, obj, form, change):
        # Asignar el usuario actual al evento antes de guardarlo
        try:
            obj.user = request.user
            obj.save()
        except ValidationError as e:
            self.message_user(request, f"Error al guardar el evento: {', '.join(e.messages)}", level='ERROR')
            return
        else:
            super().save_model(request, obj, form, change)

    


admin.site.register(ActivityType, ActivityTypeAdmin)
admin.site.register(Activity, ActivityAdmin)
admin.site.register(Event, EventAdmin)



