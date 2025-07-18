from django.db import models
from django.utils import timezone

class Investimento(models.Model):
    CATEGORIA_CHOICES = [
        ('aplicacoes', 'Aplicações'),
        ('rendimentos', 'Rendimentos'),
        ('resgates', 'Resgates'),
        ('outros', 'Outros'),
    ]
    
    titulo = models.CharField(max_length=200, verbose_name='Título')
    categoria = models.CharField(
        max_length=50,
        choices=CATEGORIA_CHOICES,
        verbose_name='Categoria'
    )
    data = models.DateField(verbose_name='Data')
    arquivo_pdf = models.FileField(
        upload_to='investimentos/pdfs/',
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
        verbose_name = 'Investimento'
        verbose_name_plural = 'Investimentos'
        ordering = ['-data']
    
    def __str__(self):
        return f"{self.titulo} - {self.categoria}"