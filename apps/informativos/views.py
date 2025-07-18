from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Informativo
from .serializers import InformativoSerializer

class InformativoViewSet(viewsets.ModelViewSet):
    queryset = Informativo.objects.all()
    serializer_class = InformativoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['titulo', 'periodo']
    ordering_fields = ['data_criacao', 'data_atualizacao', 'titulo']
    ordering = ['-data_criacao']