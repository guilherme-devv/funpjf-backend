from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    """
    Modelo de usuário customizado para o sistema
    """
    is_admin = models.BooleanField(
        default=False,
        verbose_name='É Administrador',
        help_text='Designa se o usuário tem acesso ao painel administrativo'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Data de Criação')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Data de Atualização')
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
    
    def __str__(self):
        return self.username