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

# TO DO

## Ahora

1. Modelos básicos

2. Api y Front con React

## Cosas para después

1. Localización
2. Poder ver el ID del grupo de usuarios
