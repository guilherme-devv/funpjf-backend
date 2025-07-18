from django.db import models
from django.utils import timezone

class CRP(models.Model):
    titulo = models.CharField(max_length=200, verbose_name='Título')
    data = models.DateField(verbose_name='Data')
    arquivo_pdf = models.FileField(
        upload_to='crp/pdfs/',
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
        verbose_name = 'CRP'
        verbose_name_plural = 'CRPs'
        ordering = ['-data']
    
    def __str__(self):
        return f"{self.titulo} - {self.data.strftime('%d/%m/%Y')}"