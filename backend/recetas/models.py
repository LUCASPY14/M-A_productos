from django.db import models
from productos.models import Producto
from ingredientes.models import Ingrediente

class ItemReceta(models.Model):
    producto = models.ForeignKey(
        Producto,
        on_delete=models.CASCADE,
        related_name='ingredientes_receta',
        verbose_name="Producto"
    )
    ingrediente = models.ForeignKey(
        Ingrediente,
        on_delete=models.CASCADE,
        related_name='recetas',
        verbose_name="Ingrediente"
    )
    cantidad = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Cantidad necesaria"
    )

    class Meta:
        verbose_name = "Ingrediente de receta"
        verbose_name_plural = "Ingredientes de recetas"
        unique_together = ('producto', 'ingrediente')  # evita duplicados

    def __str__(self):
        return f"{self.producto.nombre} → {self.ingrediente.nombre} ({self.cantidad})"