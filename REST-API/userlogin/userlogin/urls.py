"""userlogin URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from .views import FacebookLogin, GoogleLogin, LinkedInLogin

urlpatterns = [
    path('users/', include('users.urls')),
    path('accounts/', include('allauth.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='facebook_login'),
    url(r'^rest-auth/google/$', GoogleLogin.as_view(), name='google_login'),
    url(r'^rest-auth/linkedin/$', LinkedInLogin.as_view(), name='linkedin_login'),
    path('admin/', admin.site.urls),
]
