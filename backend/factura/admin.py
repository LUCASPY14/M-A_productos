from django.contrib import admin
from .models import Factura
from ventas.models import Venta

class VentaInline(admin.TabularInline):
    model = Venta  # Necesitamos importarlo
    extra = 1

@admin.register(Factura)
class FacturaAdmin(admin.ModelAdmin):
    list_display = ('numero_factura', 'fecha_emision', 'total_almacenado', 'total_calculado', 'creado')
    search_fields = ('numero_factura',)
    list_filter = ('fecha_emision',)
    inlines = [VentaInline]