from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import CustomUser

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            
            if not user:
                raise serializers.ValidationError('Credenciais inválidas.')
            
            if not user.is_active:
                raise serializers.ValidationError('Conta desativada.')
            
            # Verificar se é admin
            if not (user.is_staff or user.is_superuser or getattr(user, 'is_admin', False)):
                raise serializers.ValidationError('Acesso negado. Apenas administradores podem fazer login.')
            
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError('Username e password são obrigatórios.')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'is_admin']
        read_only_fields = ['id']