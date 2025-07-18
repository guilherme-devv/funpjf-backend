from django.contrib import admin
from .models import CRP

@admin.register(CRP)
class CRPAdmin(admin.ModelAdmin):
    list_display = [
        'titulo',
        'data',
        'data_criacao'
    ]
    list_filter = ['data', 'data_criacao']
    search_fields = ['titulo']
    date_hierarchy = 'data'
    readonly_fields = ['data_criacao', 'data_atualizacao']
    
    fieldsets = [
        ('Informações Principais', {
            'fields': ['titulo', 'data', 'arquivo_pdf']
        }),
        ('Datas', {
            'fields': ['data_criacao', 'data_atualizacao'],
            'classes': ['collapse']
        })
    ]