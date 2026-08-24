from rest_framework import serializers
from .models import Ingrediente


class IngredienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingrediente
        fields = ['id', 'nombre', 'unidad', 'stock_actual', 'creado']
        read_only_fields = ['id', 'creado']
