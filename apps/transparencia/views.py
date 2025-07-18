from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Transparencia
from .serializers import TransparenciaSerializer

class TransparenciaViewSet(viewsets.ModelViewSet):
    queryset = Transparencia.objects.all()
    serializer_class = TransparenciaSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['categoria']
    search_fields = ['titulo_documento', 'categoria']
    ordering_fields = ['data_documento', 'data_criacao', 'titulo_documento']
    ordering = ['-data_documento']