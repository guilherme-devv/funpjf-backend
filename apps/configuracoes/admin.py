from django.contrib import admin
from .models import ConfiguracaoSite

@admin.register(ConfiguracaoSite)
class ConfiguracaoSiteAdmin(admin.ModelAdmin):
    list_display = [
        'nome_site',
        'email_contato',
        'telefone',
        'data_atualizacao'
    ]
    readonly_fields = ['data_atualizacao']
    
    fieldsets = [
        ('Informações Gerais', {
            'fields': ['nome_site', 'descricao_site']
        }),
        ('Contato', {
            'fields': ['email_contato', 'telefone', 'endereco']
        }),
        ('Redes Sociais', {
            'fields': ['facebook', 'instagram', 'youtube']
        }),
        ('Datas', {
            'fields': ['data_atualizacao'],
            'classes': ['collapse']
        })
    ]
    
    def has_add_permission(self, request):
        # Impede a criação de múltiplas configurações
        return not ConfiguracaoSite.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Impede a exclusão da configuração
        return False