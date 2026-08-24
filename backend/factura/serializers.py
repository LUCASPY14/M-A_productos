from rest_framework import serializers
from .models import Factura


class FacturaSerializer(serializers.ModelSerializer):
    total_calculado = serializers.ReadOnlyField()

    class Meta:
        model = Factura
        fields = [
            'id', 'numero_factura', 'fecha_emision', 'total_almacenado',
            'total_calculado', 'creado',
        ]
        read_only_fields = ['id', 'creado']
