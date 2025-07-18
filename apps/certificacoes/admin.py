from django.contrib import admin
from django.utils.html import format_html
from .models import Certificacao

@admin.register(Certificacao)
class CertificacaoAdmin(admin.ModelAdmin):
    list_display = [
        'titulo_certificacao',
        'orgao_emissor',
        'valido_ate',
        'status_colored',
        'data_criacao'
    ]
    list_filter = ['orgao_emissor', 'valido_ate', 'data_criacao']
    search_fields = ['titulo_certificacao', 'orgao_emissor']
    date_hierarchy = 'valido_ate'
    readonly_fields = ['data_criacao', 'data_atualizacao', 'status_display']
    
    def status_colored(self, obj):
        if obj.status == 'valido':
            return format_html(
                '<span style="color: green; font-weight: bold;">{}</span>',
                obj.status_display
            )
        else:
            return format_html(
                '<span style="color: red; font-weight: bold;">{}</span>',
                obj.status_display
            )
    status_colored.short_description = 'Status'
    
    fieldsets = [
        ('Informações Principais', {
            'fields': ['titulo_certificacao', 'orgao_emissor', 'valido_ate', 'arquivo_pdf']
        }),
        ('Status', {
            'fields': ['status_display'],
            'classes': ['collapse']
        }),
        ('Datas', {
            'fields': ['data_criacao', 'data_atualizacao'],
            'classes': ['collapse']
        })
    ]