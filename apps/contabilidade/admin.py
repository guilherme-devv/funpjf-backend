from django.contrib import admin
from .models import Contabilidade

@admin.register(Contabilidade)
class ContabilidadeAdmin(admin.ModelAdmin):
    list_display = [
        'titulo',
        'tipo_documento',
        'data',
        'data_criacao'
    ]
    list_filter = ['tipo_documento', 'data', 'data_criacao']
    search_fields = ['titulo', 'tipo_documento']
    date_hierarchy = 'data'
    readonly_fields = ['data_criacao', 'data_atualizacao']
    
    fieldsets = [
        ('Informações Principais', {
            'fields': ['titulo', 'tipo_documento', 'data', 'arquivo_pdf']
        }),
        ('Datas', {
            'fields': ['data_criacao', 'data_atualizacao'],
            'classes': ['collapse']
        })
    ]