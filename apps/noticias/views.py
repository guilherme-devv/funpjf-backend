from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Noticia
from .serializers import NoticiaSerializer, NoticiaListSerializer

class NoticiaViewSet(viewsets.ModelViewSet):
    queryset = Noticia.objects.all()
    serializer_class = NoticiaSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status']
    search_fields = ['titulo', 'resumo', 'conteudo_completo']
    ordering_fields = ['data_criacao', 'data_atualizacao', 'titulo']
    ordering = ['-data_criacao']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return NoticiaListSerializer
        return NoticiaSerializer
    
    @action(detail=False, methods=['get'])
    def publicadas(self, request):
        """Retorna apenas notícias publicadas"""
        noticias = self.queryset.filter(status='publicado')
        serializer = NoticiaListSerializer(noticias, many=True)
        return Response(serializer.data)