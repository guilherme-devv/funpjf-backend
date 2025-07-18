from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CRPViewSet

router = DefaultRouter()
router.register(r'crp', CRPViewSet)

urlpatterns = [
    path('', include(router.urls)),
]