from django.contrib import admin
from .models import Ingrediente

@admin.register(Ingrediente)
class IngredienteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'unidad', 'stock_actual', 'costo_compra', 'cantidad_compra', 'costo_unitario', 'creado')
    search_fields = ('nombre',)
    list_filter = ('unidad',)