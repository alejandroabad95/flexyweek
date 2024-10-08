# backend/flexyweek/settings/base.py

import os
from pathlib import Path


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent



# Application definition
INSTALLED_APPS = [
    'main',
    'rest_framework',
    'corsheaders',
    'knox',
    'authentication',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'whitenoise.runserver_nostatic',  # WhiteNoise for development
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'knox.auth.TokenAuthentication',
    ),
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',  # Antes que todo, para la seguridad
    'whitenoise.middleware.WhiteNoiseMiddleware',      # Antes que el resto de middleware de procesamiento de respuesta
    'django.contrib.sessions.middleware.SessionMiddleware',  # Manejo de sesiones
    'corsheaders.middleware.CorsMiddleware',           # Gestión de CORS
    'django.middleware.common.CommonMiddleware',       # Funcionalidades comunes
    'django.middleware.csrf.CsrfViewMiddleware',       # Protección CSRF
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # Autenticación de usuario
    'django.contrib.messages.middleware.MessageMiddleware',    # Mensajes de sesión
    'django.middleware.clickjacking.XFrameOptionsMiddleware',  # Protección contra clickjacking
]


ROOT_URLCONF = 'flexyweek.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'flexyweek.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'es-es'

TIME_ZONE = 'Europe/Madrid'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'  # Directorio donde se recogerán los archivos estáticos

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'  # Almacenamiento WhiteNoise para compresión y caching


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


