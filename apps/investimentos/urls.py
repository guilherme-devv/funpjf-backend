from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InvestimentoViewSet

router = DefaultRouter()
router.register(r'investimentos', InvestimentoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]