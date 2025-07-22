from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='admin_login'),
    path('logout/', views.logout_view, name='admin_logout'),
    path('profile/', views.profile_view, name='admin_profile'),
    path('refresh/', views.refresh_token_view, name='refresh_token'),
]