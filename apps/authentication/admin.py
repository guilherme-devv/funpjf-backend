from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff', 'is_admin', 'is_active', 'created_at']
    list_filter = ['is_staff', 'is_superuser', 'is_admin', 'is_active', 'created_at']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    
    fieldsets = UserAdmin.fieldsets + (
        ('Permissões Customizadas', {
            'fields': ('is_admin',)
        }),
        ('Datas', {
            'fields': ('created_at', 'updated_at'),
            'classes': ['collapse']
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']