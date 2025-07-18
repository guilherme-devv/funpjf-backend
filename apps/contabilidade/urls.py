from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContabilidadeViewSet

router = DefaultRouter()
router.register(r'contabilidade', ContabilidadeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]