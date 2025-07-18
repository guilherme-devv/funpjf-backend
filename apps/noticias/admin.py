from django.contrib import admin
from .models import Noticia

@admin.register(Noticia)
class NoticiaAdmin(admin.ModelAdmin):
    list_display = [
        'titulo',
        'status',
        'data_criacao',
        'data_atualizacao'
    ]
    list_filter = ['status', 'data_criacao']
    search_fields = ['titulo', 'resumo', 'conteudo_completo']
    list_editable = ['status']
    readonly_fields = ['data_criacao', 'data_atualizacao']
    
    fieldsets = [
        ('Informações Principais', {
            'fields': ['titulo', 'resumo', 'conteudo_completo', 'imagem', 'status']
        }),
        ('Datas', {
            'fields': ['data_criacao', 'data_atualizacao'],
            'classes': ['collapse']
        })
    ]