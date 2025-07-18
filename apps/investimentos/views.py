from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Investimento
from .serializers import InvestimentoSerializer

class InvestimentoViewSet(viewsets.ModelViewSet):
    queryset = Investimento.objects.all()
    serializer_class = InvestimentoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['categoria']
    search_fields = ['titulo', 'categoria']
    ordering_fields = ['data', 'data_criacao', 'titulo']
    ordering = ['-data']