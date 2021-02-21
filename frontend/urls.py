from django.urls import path
import frontend.views as frontend_views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', frontend_views.index, name='index'),
    path('page/', frontend_views.index, name='page'),
    path('private/', frontend_views.index, name='private'),
    path('register/', frontend_views.index, name='register'),
]
