"""
Django settings for blueinheart project.

Generated by 'django-admin startproject' using Django 4.0.4.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-tr&c99#!@tn!gepa&%t$b=rgg)dj!(5dz57130n3k!kt%&yz4q'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# ALLOWED_HOSTS = []
ALLOWED_HOSTS = ['*']


SITE_ID = 1

# Application definition

INSTALLED_APPS = [
    'account.apps.AccountConfig',
    #这里将我们的应用放在应用列表的最前边，原因是：我们稍后会为自己的应用编写验证系统的模板，Django内置的验证系统自带了一套模板，
    # 如此设置可以让我们的模板覆盖其他应用中的模板设置。Django按照INSTALLED_APPS中的顺序寻找模板。
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blog.apps.BlogConfig',
    'taggit',
    'django.contrib.sites',
    'django.contrib.sitemaps',
    'django.contrib.postgres',#全文搜索用
    'back_stage.apps.BackStageConfig'


]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'blueinheart.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates']
        ,
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

WSGI_APPLICATION = 'blueinheart.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'blueinheart',
        # 'NAME': 'ep_develop',
        'USER': 'postgres',
        'PASSWORD': 'cc',
        # 'HOST': '10.97.80.118',
        'HOST': '127.0.0.1',
        # 'HOST': '10.97.80.147',

        'PORT': '5432',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/4.0/topics/i18n/

# LANGUAGE_CODE = 'en-us'
LANGUAGE_CODE = 'zh-Hans'

# TIME_ZONE = 'UTC'
TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

#模拟邮箱，没有配置好邮箱时用这个做实验，会在命令窗里显示发送的邮件内容
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

#下面用的465端口，阿里云可以用的
EMAIL_USE_SSL = True
EMAIL_HOST = 'smtp.163.com'
EMAIL_PORT = 465
EMAIL_HOST_USER = 'chen320821@163.com' # 帐号
# EMAIL_HOST_PASSWORD =  'angela123.163'  # 密码
EMAIL_HOST_PASSWORD =  'CZZLYIRGEDHOTHWA'  # 密码
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


# 如果没有指定next参数，登录成功后重定向的URL
LOGIN_REDIRECT_URL = 'dashboard'
# 用户需要登录的情况下被重定向到的URL地址（例如@login_required重定向到的地址）
LOGIN_URL = 'login'
# 用户需要登出的时候被重定向到的URL地址
LOGOUT_URL = 'logout'


# 由于我们要允许用户上传图片，必须配置Django让其提供媒体文件服务，在settings.py中加入下列内容：
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


