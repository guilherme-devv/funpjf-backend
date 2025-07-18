from django.db import models
from django.utils import timezone

class Informativo(models.Model):
    titulo = models.CharField(max_length=200, verbose_name='Título')
    periodo = models.CharField(max_length=100, verbose_name='Período')
    arquivo_pdf = models.FileField(
        upload_to='informativos/pdfs/',
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
        verbose_name = 'Informativo'
        verbose_name_plural = 'Informativos'
        ordering = ['-data_criacao']
    
    def __str__(self):
        return f"{self.titulo} - {self.periodo}"