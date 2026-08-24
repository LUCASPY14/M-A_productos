from django.contrib import admin
from .models import ItemReceta

@admin.register(ItemReceta)
class ItemRecetaAdmin(admin.ModelAdmin):
    list_display = ('producto', 'ingrediente', 'cantidad')
    search_fields = ('producto__nombre', 'ingrediente__nombre')
    list_filter = ('producto',)