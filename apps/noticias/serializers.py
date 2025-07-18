from rest_framework import serializers
from .models import Noticia

class NoticiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Noticia
        fields = [
            'id',
            'titulo',
            'resumo',
            'conteudo_completo',
            'imagem',
            'status',
            'data_criacao',
            'data_atualizacao'
        ]
        read_only_fields = ['data_criacao', 'data_atualizacao']

class NoticiaListSerializer(serializers.ModelSerializer):
    """Serializer simplificado para listagem de notícias"""
    
    class Meta:
        model = Noticia
        fields = [
            'id',
            'titulo',
            'resumo',
            'imagem',
            'status',
            'data_criacao'
        ]