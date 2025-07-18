from django.db import models
from django.utils import timezone

class Noticia(models.Model):
    STATUS_CHOICES = [
        ('publicado', 'Publicado'),
        ('nao_publicado', 'Não Publicado'),
    ]
    
    titulo = models.CharField(max_length=200, verbose_name='Título')
    resumo = models.TextField(max_length=500, verbose_name='Resumo')
    conteudo_completo = models.TextField(verbose_name='Conteúdo Completo')
    imagem = models.ImageField(
        upload_to='noticias/imagens/',
        blank=True,
        null=True,
        verbose_name='Imagem'
    )
    status = models.CharField(
        max_length=15,
        choices=STATUS_CHOICES,
        default='nao_publicado',
        verbose_name='Status'
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
        verbose_name = 'Notícia'
        verbose_name_plural = 'Notícias'
        ordering = ['-data_criacao']
    
    def __str__(self):
        return self.titulo