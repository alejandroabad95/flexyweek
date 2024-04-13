from django import forms
from .models import Activity

class ActivityForm(forms.ModelForm):
    class Meta:
        model = Activity  # Asigna el modelo Activity al formulario
        fields = '__all__'  # Incluye todos los campos del modelo en el formulario

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)  # Extrae el argumento 'user' de kwargs
        super(ActivityForm, self).__init__(*args, **kwargs)  # Llama al inicializador del formulario

        # Si hay un usuario proporcionado, inicializa el campo 'user' con ese usuario
        if user:
            self.fields['user'].initial = user

    def clean_user(self):
        # Valida y limpia el campo 'user' antes de guardarlo
        # Si el objeto ya tiene un usuario asignado, devuelve ese usuario
        # De lo contrario, devuelve el valor limpio del campo 'user'
        return self.instance.user if self.instance.user_id else self.cleaned_data['user']
