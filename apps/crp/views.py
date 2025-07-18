from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import CRP
from .serializers import CRPSerializer

class CRPViewSet(viewsets.ModelViewSet):
    queryset = CRP.objects.all()
    serializer_class = CRPSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['titulo']
    ordering_fields = ['data', 'data_criacao', 'titulo']
    ordering = ['-data']