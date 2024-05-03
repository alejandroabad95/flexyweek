# Primeros pasos

python3 -m venv nombre_de_tu_entorno

source nombre_de_tu_entorno/bin/activate

pip install django

django-admin startproject nombre_de_tu_proyecto .

python manage.py startapp main

Base de datos a postgre SQL

DATABASES = {
'default': {
'ENGINE': 'django.db.backends.postgresql',
'NAME': 'flexyweek_db', # Nombre de tu base de datos en PostgreSQL
'USER': 'postgres', # Nombre de usuario de PostgreSQL
'PASSWORD': '', # Contraseña de tu usuario de PostgreSQL
'HOST': 'localhost', # Ruta del host de tu base de datos (por lo general, localhost)
'PORT': '5432', # Puerto de tu base de datos (por defecto, 5432 para PostgreSQL)
}
}

# LIBRERIAS

pip install psycopg2-binary # Para usar postgre SQL
pip install django-cors-headers # para usar cors permitir peticiones desde el front
pip install django-rest-knox

# TO DO

## Ahora

1. Vistas de actividades

## Cosas para después

1. Localización
2. Poder ver el ID del grupo de usuarios
3. Al modelo Evento añadir duración y bloques. Mantener prioridad,
   los eventos no tendrán hora de inicio-fin sino que irán asignados a un bloque
   y tendrán un prioridad interna.
