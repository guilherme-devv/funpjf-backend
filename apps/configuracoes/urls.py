from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ConfiguracaoSiteViewSet

router = DefaultRouter()
router.register(r'configuracoes', ConfiguracaoSiteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]