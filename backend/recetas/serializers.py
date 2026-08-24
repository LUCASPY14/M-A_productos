from rest_framework import serializers
from .models import ItemReceta


class ItemRecetaSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.ReadOnlyField(source='producto.nombre')
    ingrediente_nombre = serializers.ReadOnlyField(source='ingrediente.nombre')

    class Meta:
        model = ItemReceta
        fields = ['id', 'producto', 'producto_nombre', 'ingrediente', 'ingrediente_nombre', 'cantidad']
        read_only_fields = ['id']
