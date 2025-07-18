from django.db import models
from django.core.exceptions import ValidationError

class ConfiguracaoSite(models.Model):
    nome_site = models.CharField(
        max_length=100,
        default='Fundo Previdenciário José de Freitas',
        verbose_name='Nome do Site'
    )
    descricao_site = models.TextField(
        blank=True,
        verbose_name='Descrição do Site'
    )
    
    # Informações de Contato
    email_contato = models.EmailField(
        blank=True,
        verbose_name='Email de Contato'
    )
    telefone = models.CharField(
        max_length=20,
        blank=True,
        verbose_name='Telefone'
    )
    endereco = models.TextField(
        blank=True,
        verbose_name='Endereço'
    )
    
    # Redes Sociais
    facebook = models.URLField(
        blank=True,
        verbose_name='Facebook'
    )
    instagram = models.URLField(
        blank=True,
        verbose_name='Instagram'
    )
    youtube = models.URLField(
        blank=True,
        verbose_name='YouTube'
    )
    
    data_atualizacao = models.DateTimeField(
        auto_now=True,
        verbose_name='Data de Atualização'
    )
    
    class Meta:
        verbose_name = 'Configuração do Site'
        verbose_name_plural = 'Configurações do Site'
    
    def __str__(self):
        return self.nome_site
    
    def save(self, *args, **kwargs):
        # Garantir que apenas uma instância exista
        if not self.pk and ConfiguracaoSite.objects.exists():
            raise ValidationError('Apenas uma configuração pode existir.')
        super().save(*args, **kwargs)
    
    @classmethod
    def get_config(cls):
        """Retorna a configuração atual ou cria uma nova"""
        config, created = cls.objects.get_or_create(
            pk=1,
            defaults={
                'nome_site': 'Fundo Previdenciário José de Freitas',
                'descricao_site': 'Sistema de gestão do fundo previdenciário'
            }
        )
        return config