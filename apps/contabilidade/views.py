from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Contabilidade
from .serializers import ContabilidadeSerializer

class ContabilidadeViewSet(viewsets.ModelViewSet):
    queryset = Contabilidade.objects.all()
    serializer_class = ContabilidadeSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['tipo_documento']
    search_fields = ['titulo', 'tipo_documento']
    ordering_fields = ['data', 'data_criacao', 'titulo']
    ordering = ['-data']