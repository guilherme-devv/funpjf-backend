from rest_framework import serializers
from .models import Certificacao

class CertificacaoSerializer(serializers.ModelSerializer):
    valido_ate_formatado = serializers.SerializerMethodField()
    status = serializers.ReadOnlyField()
    status_display = serializers.ReadOnlyField()
    
    class Meta:
        model = Certificacao
        fields = [
            'id',
            'titulo_certificacao',
            'orgao_emissor',
            'valido_ate',
            'valido_ate_formatado',
            'arquivo_pdf',
            'status',
            'status_display',
            'data_criacao',
            'data_atualizacao'
        ]
        read_only_fields = ['data_criacao', 'data_atualizacao']
    
    def get_valido_ate_formatado(self, obj):
        return obj.valido_ate.strftime('%d/%m/%Y') if obj.valido_ate else None