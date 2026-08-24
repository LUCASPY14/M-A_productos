from django.contrib import admin
from .models import Venta

@admin.register(Venta)
class VentaAdmin(admin.ModelAdmin):
    list_display = ('producto', 'cantidad', 'precio_unitario', 'fecha_venta', 'factura', 'total')
    search_fields = ('producto__nombre', 'factura__numero_factura')
    list_filter = ('fecha_venta', 'factura')