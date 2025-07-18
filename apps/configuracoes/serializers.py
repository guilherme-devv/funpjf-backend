from rest_framework import serializers
from .models import ConfiguracaoSite

class ConfiguracaoSiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracaoSite
        fields = [
            'id',
            'nome_site',
            'descricao_site',
            'email_contato',
            'telefone',
            'endereco',
            'facebook',
            'instagram',
            'youtube',
            'data_atualizacao'
        ]
        read_only_fields = ['data_atualizacao']