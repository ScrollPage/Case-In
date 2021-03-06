"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
import os
from datetime import timedelta

from . import local2 as local
import pusher

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "to_3s%(*gk9xedl&536zhf4ytud^h64()ot8r-lr7b2#7&$sg#"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(int(os.environ.get("DEBUG", local.DEBUG)))

ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", "127.0.0.1 localhost").split(" ")


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "channels",
    "corsheaders",
    "django_celery_beat",
    "djoser",
    "drf_yasg",
    "rest_auth",
    "rest_framework",
    "rest_framework.authtoken",
    "storages",
    "silk",
    "achieve",
    "calendly",
    "chat",
    "control",
    "department",
    "doc",
    "feed",
    "notifications",
    "diagram",
    "post",
    "worker",
]

MIDDLEWARE = [
    "silk.middleware.SilkyMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

REDIS_HOST = os.environ.get("REDIS_HOST", local.REDIS_HOST)
REDIS_PORT = os.environ.get("REDIS_PORT", local.REDIS_PORT)

WSGI_APPLICATION = "backend.wsgi.application"

# Django Channels
ASGI_APPLICATION = "backend.asgi.application"

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [(REDIS_HOST, REDIS_PORT)],
        },
    },
}

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': os.environ.get('SQL_ENGINE', local.SQL_ENGINE),
#         'NAME': os.environ.get('SQL_DATABASE', local.SQL_DATABASE),
#         'USER': os.environ.get('SQL_USER', local.SQL_USER),
#         'PASSWORD': os.environ.get('SQL_PASSWORD', local.SQL_PASSWORD),
#         'HOST': os.environ.get('SQL_HOST', local.SQL_HOST),
#         'PORT': os.environ.get('SQL_PORT', local.SQL_PORT),
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = "/staticfiles/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

# User model
AUTH_USER_MODEL = "worker.Worker"

# Cors
CORS_ORIGIN_WHITELIST = ("http://127.0.0.1:3000", "http://localhost:3000")

# JWT Authentication
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": True,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    "AUDIENCE": None,
    "ISSUER": None,
    "AUTH_HEADER_TYPES": ("Token",),
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "JTI_CLAIM": "jti",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(days=1),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
}

# Domains
DJANGO_DOMAIN = "http://127.0.0.1:8000"
REACT_DOMAIN = "http://127.0.0.1:3000"

# Djoser
DJOSER = {
    "PASSWORD_RESET_CONFIRM_URL": "#/password/reset/confirm/{uid}/{token}",
    "USERNAME_RESET_CONFIRM_URL": "#/username/reset/confirm/{uid}/{token}",
    "ACTIVATION_URL": "#",
    "SEND_ACTIVATION_EMAIL": False,
    "SERIALIZERS": {
        "current_user": "worker.api.serializers.WorkerSerializer",
    },
}

# REST
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
    ),
}

# AWS
AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID", local.AWS_ACCESS_KEY_ID)
AWS_SECRET_ACCESS_KEY = os.environ.get(
    "AWS_SECRET_ACCESS_KEY", local.AWS_SECRET_ACCESS_KEY
)
AWS_STORAGE_BUCKET_NAME = os.environ.get(
    "AWS_STORAGE_BUCKET_NAME", local.AWS_STORAGE_BUCKET_NAME
)

AWS_S3_FILE_OVERWRITE = False

DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
AWS_HEADERS = {
    "CacheControl": "max-age=86400",
}
AWS_S3_REGION_NAME = "eu-north-1"
# AWS_S3_SIGNATURE_VERSION = 's3v4'
# AWS_S3_HOST = 'eu-north-1'
AWS_S3_CUSTOM_DOMAIN = (
    f"{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_S3_REGION_NAME}.amazonaws.com"
)
# AWS_DEFAULT_ACL = None
# AWS_AUTO_CREATE_BUCKET = True
# S3_USE_SIGV4 = True

# Pusher
pusher_client = pusher.Pusher(
    app_id=os.environ.get("PUSHER_APP_ID", local.PUSHER_APP_ID),
    key=os.environ.get("PUSHER_KEY", local.PUSHER_KEY),
    secret=os.environ.get("PUSHER_SECRET", local.PUSHER_SECRET),
    cluster=os.environ.get("PUSHER_CLUSTER", local.PUSHER_CLUSTER),
    ssl=bool(os.environ.get("PUSHER_SSL", local.PUSHER_SSL)),
)

# Celery
CELERY_REDIS_DB = "3"
CELERY_BROKER_URL = f"redis://{REDIS_HOST}:{REDIS_PORT}/{CELERY_REDIS_DB}"
CELERY_BROKER_TRANSPORT_OPTIONS = {"visiblity_timeout": 3600}
CELERY_RESULT_BACKEND = f"redis://{REDIS_HOST}:{REDIS_PORT}/{CELERY_REDIS_DB}"
CELERY_ACCEPT_CONTENT = ["json", "applicaion/json", "applicaion/text"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERILIZER = "json"
