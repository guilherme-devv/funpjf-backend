from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransparenciaViewSet

router = DefaultRouter()
router.register(r'transparencia', TransparenciaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]