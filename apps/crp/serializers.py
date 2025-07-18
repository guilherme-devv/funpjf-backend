from rest_framework import serializers
from .models import CRP

class CRPSerializer(serializers.ModelSerializer):
    data_formatada = serializers.SerializerMethodField()
    
    class Meta:
        model = CRP
        fields = [
            'id',
            'titulo',
            'data',
            'data_formatada',
            'arquivo_pdf',
            'data_criacao',
            'data_atualizacao'
        ]
        read_only_fields = ['data_criacao', 'data_atualizacao']
    
    def get_data_formatada(self, obj):
        return obj.data.strftime('%d/%m/%Y') if obj.data else None