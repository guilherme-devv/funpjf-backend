from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import LoginSerializer, UserSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Endpoint para login de administradores
    """
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        # Gerar tokens JWT
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        
        return Response({
            'access_token': str(access_token),
            'refresh_token': str(refresh),
            'user': UserSerializer(user).data,
            'message': 'Login realizado com sucesso'
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    Endpoint para logout
    """
    try:
        refresh_token = request.data.get('refresh_token')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        
        return Response({
            'message': 'Logout realizado com sucesso'
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'error': 'Erro ao fazer logout'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    """
    Endpoint para obter dados do usuário logado
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def refresh_token_view(request):
    """
    Endpoint para renovar token
    """
    try:
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({
                'error': 'Refresh token é obrigatório'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        token = RefreshToken(refresh_token)
        access_token = token.access_token
        
        return Response({
            'access_token': str(access_token)
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'error': 'Token inválido'
        }, status=status.HTTP_400_BAD_REQUEST)