from django.contrib import admin
from .models import Transparencia

@admin.register(Transparencia)
class TransparenciaAdmin(admin.ModelAdmin):
    list_display = [
        'titulo_documento',
        'categoria',
        'data_documento',
        'data_criacao'
    ]
    list_filter = ['categoria', 'data_documento', 'data_criacao']
    search_fields = ['titulo_documento', 'categoria']
    date_hierarchy = 'data_documento'
    readonly_fields = ['data_criacao', 'data_atualizacao']
    
    fieldsets = [
        ('Informações Principais', {
            'fields': ['titulo_documento', 'categoria', 'data_documento', 'arquivo_pdf']
        }),
        ('Datas', {
            'fields': ['data_criacao', 'data_atualizacao'],
            'classes': ['collapse']
        })
    ]