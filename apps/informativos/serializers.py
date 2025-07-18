from rest_framework import serializers
from .models import Informativo

class InformativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Informativo
        fields = [
            'id',
            'titulo',
            'periodo',
            'arquivo_pdf',
            'data_criacao',
            'data_atualizacao'
        ]
        read_only_fields = ['data_criacao', 'data_atualizacao']