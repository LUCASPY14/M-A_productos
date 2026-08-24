from rest_framework import serializers
from .models import Producto


class ProductoSerializer(serializers.ModelSerializer):
    costo_receta = serializers.ReadOnlyField()
    margen = serializers.ReadOnlyField()
    margen_porcentual = serializers.ReadOnlyField()

    class Meta:
        model = Producto
        fields = [
            'id', 'nombre', 'descripcion', 'precio_venta', 'activo', 'creado',
            'costo_receta', 'margen', 'margen_porcentual',
        ]
        read_only_fields = ['id', 'creado']
