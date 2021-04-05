from django.urls import path
import frontend.views as frontend_views
from django.contrib.auth import views as auth_views

# All urls will point to same HTML template because it is SPA application
urlpatterns = [
    path('', frontend_views.index, name='index'),
    path('page/', frontend_views.index, name='page'),
    path('private/', frontend_views.index, name='private'),
    path('login/', frontend_views.index, name='login'),
    path('register/', frontend_views.index, name='register'),
    path('starred/', frontend_views.index, name='starred'),
]
