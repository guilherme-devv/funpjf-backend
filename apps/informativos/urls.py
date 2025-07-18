from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InformativoViewSet

router = DefaultRouter()
router.register(r'informativos', InformativoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]