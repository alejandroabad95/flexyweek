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
pip install celery
pip install redis

# CELERY con Redis

// redis en local
brew services start redis
brew services stop redis

// Ejecuta las tareas en segundo plano
celery -A flexyweek.celery_config worker -l info

// Monitorización de tareas
celery -A flexyweek.celery_config worker -l info -E

// Programa las tareas con la configuración definida
celery -A flexyweek.celery_config beat -l info

# Versiones

v0.1.0

1. Primer dígito cambios significativos

2. Nuevas funcionalidades

3. Número de parche, correción de errores
