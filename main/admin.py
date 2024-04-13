from django.contrib import admin
from .models import ActivityType, Activity
from .forms import ActivityForm

# Registro de los modelos ActivityType y Activity


class ActivityTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class ActivityAdmin(admin.ModelAdmin):
    list_display = ('name', 'activity_type', 'user')
    search_fields = ['name', 'activity_type__name']
    form = ActivityForm

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


admin.site.register(ActivityType, ActivityTypeAdmin)
admin.site.register(Activity, ActivityAdmin)


