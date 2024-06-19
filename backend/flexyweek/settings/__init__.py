# backend/flexyweek/settings/__init__.py
import os
from .base import *

ENVIRONMENT = os.getenv('DJANGO_ENV', 'local')

if ENVIRONMENT == 'production':
    from .production import *
else:
    from .local import *
