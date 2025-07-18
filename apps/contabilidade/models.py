from django.db import models
from django.utils import timezone

class Contabilidade(models.Model):
    TIPO_CHOICES = [
        ('balancete', 'Balancete'),
        ('relatorio', 'Relatório'),
        ('demonstrativo', 'Demonstrativo'),
        ('outros', 'Outros'),
    ]
    
    titulo = models.CharField(max_length=200, verbose_name='Título')
    tipo_documento = models.CharField(
        max_length=50,
        choices=TIPO_CHOICES,
        verbose_name='Tipo de Documento'
    )
    data = models.DateField(verbose_name='Data')
    arquivo_pdf = models.FileField(
        upload_to='contabilidade/pdfs/',
        verbose_name='Arquivo PDF'
    )
    data_criacao = models.DateTimeField(
        default=timezone.now,
        verbose_name='Data de Criação'
    )
    data_atualizacao = models.DateTimeField(
        auto_now=True,
        verbose_name='Data de Atualização'
    )
    
    class Meta:
        verbose_name = 'Documento Contábil'
        verbose_name_plural = 'Documentos Contábeis'
        ordering = ['-data']
    
    def __str__(self):
        return f"{self.titulo} - {self.tipo_documento}"