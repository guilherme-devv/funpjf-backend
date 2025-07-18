from django.db import models
from django.utils import timezone
from datetime import date

class Certificacao(models.Model):
    titulo_certificacao = models.CharField(max_length=200, verbose_name='Título da Certificação')
    orgao_emissor = models.CharField(max_length=200, verbose_name='Órgão Emissor')
    valido_ate = models.DateField(verbose_name='Válido Até')
    arquivo_pdf = models.FileField(
        upload_to='certificacoes/pdfs/',
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
        verbose_name = 'Certificação'
        verbose_name_plural = 'Certificações'
        ordering = ['-valido_ate']
    
    def __str__(self):
        return f"{self.titulo_certificacao} - {self.orgao_emissor}"
    
    @property
    def status(self):
        """Retorna o status da certificação (válido/expirado)"""
        if self.valido_ate >= date.today():
            return 'valido'
        return 'expirado'
    
    @property
    def status_display(self):
        """Retorna o status formatado para exibição"""
        return 'Válido' if self.status == 'valido' else 'Expirado'