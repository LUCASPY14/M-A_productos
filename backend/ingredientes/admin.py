from django.contrib import admin
from .models import Ingrediente

@admin.register(Ingrediente)
class IngredienteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'unidad', 'stock_actual', 'creado')
    search_fields = ('nombre',)
    list_filter = ('unidad',)