from rest_framework import serializers
from .models import Venta


class VentaSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.ReadOnlyField(source='producto.nombre')
    total = serializers.ReadOnlyField()

    class Meta:
        model = Venta
        fields = [
            'id', 'producto', 'producto_nombre', 'cantidad', 'precio_unitario',
            'fecha_venta', 'factura', 'total',
        ]
        read_only_fields = ['id']
