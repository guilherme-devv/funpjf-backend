from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ConfiguracaoSite
from .serializers import ConfiguracaoSiteSerializer

class ConfiguracaoSiteViewSet(viewsets.ModelViewSet):
    queryset = ConfiguracaoSite.objects.all()
    serializer_class = ConfiguracaoSiteSerializer
    
    def get_permissions(self):
        """Permite leitura para todos, mas escrita apenas para autenticados"""
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def atual(self, request):
        """Retorna as configurações atuais"""
        config = ConfiguracaoSite.get_config()
        serializer = self.get_serializer(config)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post', 'put', 'patch'], permission_classes=[IsAuthenticated])
    def atualizar(self, request):
        """Atualiza as configurações"""
        config = ConfiguracaoSite.get_config()
        serializer = self.get_serializer(config, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)