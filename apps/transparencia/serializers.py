from rest_framework import serializers
from .models import Transparencia

class TransparenciaSerializer(serializers.ModelSerializer):
    data_documento_formatada = serializers.SerializerMethodField()
    
    class Meta:
        model = Transparencia
        fields = [
            'id',
            'titulo_documento',
            'categoria',
            'data_documento',
            'data_documento_formatada',
            'arquivo_pdf',
            'data_criacao',
            'data_atualizacao'
        ]
        read_only_fields = ['data_criacao', 'data_atualizacao']
    
    def get_data_documento_formatada(self, obj):
        return obj.data_documento.strftime('%d/%m/%Y') if obj.data_documento else None