from django.contrib import admin
from .models import Producto
from recetas.models import ItemReceta

class ItemRecetaInline(admin.TabularInline):
    model = ItemReceta  # Necesitamos importarlo
    extra = 1

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio_venta', 'activo', 'creado')
    search_fields = ('nombre',)
    list_filter = ('activo',)
    inlines = [ItemRecetaInline]