from django.contrib import admin
from .models import Informativo

@admin.register(Informativo)
class InformativoAdmin(admin.ModelAdmin):
    list_display = [
        'titulo',
        'periodo',
        'data_criacao',
        'data_atualizacao'
    ]
    list_filter = ['data_criacao']
    search_fields = ['titulo', 'periodo']
    readonly_fields = ['data_criacao', 'data_atualizacao']
    
    fieldsets = [
        ('Informações Principais', {
            'fields': ['titulo', 'periodo', 'arquivo_pdf']
        }),
        ('Datas', {
            'fields': ['data_criacao', 'data_atualizacao'],
            'classes': ['collapse']
        })
    ]