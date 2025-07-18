from rest_framework import serializers
from .models import Investimento

class InvestimentoSerializer(serializers.ModelSerializer):
    data_formatada = serializers.SerializerMethodField()
    
    class Meta:
        model = Investimento
        fields = [
            'id',
            'titulo',
            'categoria',
            'data',
            'data_formatada',
            'arquivo_pdf',
            'data_criacao',
            'data_atualizacao'
        ]
        read_only_fields = ['data_criacao', 'data_atualizacao']
    
    def get_data_formatada(self, obj):
        return obj.data.strftime('%d/%m/%Y') if obj.data else None