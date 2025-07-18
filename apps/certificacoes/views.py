from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from datetime import date
from .models import Certificacao
from .serializers import CertificacaoSerializer

class CertificacaoViewSet(viewsets.ModelViewSet):
    queryset = Certificacao.objects.all()
    serializer_class = CertificacaoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['titulo_certificacao', 'orgao_emissor']
    ordering_fields = ['valido_ate', 'data_criacao', 'titulo_certificacao']
    ordering = ['-valido_ate']
    
    @action(detail=False, methods=['get'])
    def validas(self, request):
        """Retorna apenas certificações válidas"""
        certificacoes = self.queryset.filter(valido_ate__gte=date.today())
        serializer = self.get_serializer(certificacoes, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def expiradas(self, request):
        """Retorna apenas certificações expiradas"""
        certificacoes = self.queryset.filter(valido_ate__lt=date.today())
        serializer = self.get_serializer(certificacoes, many=True)
        return Response(serializer.data)