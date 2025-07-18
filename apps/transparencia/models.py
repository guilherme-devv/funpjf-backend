from django.db import models
from django.utils import timezone

class Transparencia(models.Model):
    CATEGORIA_CHOICES = [
        ('atas', 'Atas'),
        ('balancetes', 'Balancetes'),
        ('demonstrativos', 'Demonstrativos'),
        ('relatórios', 'Relatórios'),
        ('outros', 'Outros'),
    ]
    
    titulo_documento = models.CharField(max_length=200, verbose_name='Título do Documento')
    categoria = models.CharField(
        max_length=50,
        choices=CATEGORIA_CHOICES,
        verbose_name='Categoria'
    )
    data_documento = models.DateField(verbose_name='Data do Documento')
    arquivo_pdf = models.FileField(
        upload_to='transparencia/pdfs/',
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
        verbose_name = 'Documento de Transparência'
        verbose_name_plural = 'Documentos de Transparência'
        ordering = ['-data_documento']
    
    def __str__(self):
        return f"{self.titulo_documento} - {self.categoria}"