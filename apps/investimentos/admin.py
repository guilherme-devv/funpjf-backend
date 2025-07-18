from django.contrib import admin
from .models import Investimento

@admin.register(Investimento)
class InvestimentoAdmin(admin.ModelAdmin):
    list_display = [
        'titulo',
        'categoria',
        'data',
        'data_criacao'
    ]
    list_filter = ['categoria', 'data', 'data_criacao']
    search_fields = ['titulo', 'categoria']
    date_hierarchy = 'data'
    readonly_fields = ['data_criacao', 'data_atualizacao']
    
    fieldsets = [
        ('Informações Principais', {
            'fields': ['titulo', 'categoria', 'data', 'arquivo_pdf']
        }),
        ('Datas', {
            'fields': ['data_criacao', 'data_atualizacao'],
            'classes': ['collapse']
        })
    ]