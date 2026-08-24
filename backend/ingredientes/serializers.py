from rest_framework import serializers
from .models import Ingrediente


class IngredienteSerializer(serializers.ModelSerializer):
    costo_unitario = serializers.ReadOnlyField()

    class Meta:
        model = Ingrediente
        fields = [
            'id', 'nombre', 'unidad', 'stock_actual',
            'costo_compra', 'cantidad_compra', 'costo_unitario', 'creado',
        ]
        read_only_fields = ['id', 'creado']
