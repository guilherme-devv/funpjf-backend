from rest_framework import serializers
from .models import Contabilidade

class ContabilidadeSerializer(serializers.ModelSerializer):
    data_formatada = serializers.SerializerMethodField()
    
    class Meta:
        model = Contabilidade
        fields = [
            'id',
            'titulo',
            'tipo_documento',
            'data',
            'data_formatada',
            'arquivo_pdf',
            'data_criacao',
            'data_atualizacao'
        ]
        read_only_fields = ['data_criacao', 'data_atualizacao']
    
    def get_data_formatada(self, obj):
        return obj.data.strftime('%d/%m/%Y') if obj.data else None