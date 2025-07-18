from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Fundo Previdenciário José de Freitas API",
        default_version='v1',
        description="API para o sistema do Fundo Previdenciário de José de Freitas",
        contact=openapi.Contact(email="contato@fundoprevidenciario.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API URLs
    path('api/v1/', include('apps.noticias.urls')),
    path('api/v1/', include('apps.informativos.urls')),
    path('api/v1/', include('apps.transparencia.urls')),
    path('api/v1/', include('apps.crp.urls')),
    path('api/v1/', include('apps.contabilidade.urls')),
    path('api/v1/', include('apps.investimentos.urls')),
    path('api/v1/', include('apps.certificacoes.urls')),
    path('api/v1/', include('apps.configuracoes.urls')),
    
    # Authentication
    path('api/auth/', include('rest_framework_simplejwt.urls')),
    
    # Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)