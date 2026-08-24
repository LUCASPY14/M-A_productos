from django.db import models
from productos.models import Producto
from factura.models import Factura   # import correcto

class Venta(models.Model):
    producto = models.ForeignKey(
        Producto,
        on_delete=models.CASCADE,
        related_name='ventas',
        verbose_name="Producto"
    )
    cantidad = models.PositiveIntegerField(verbose_name="Cantidad vendida")
    precio_unitario = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Precio unitario"
    )
    fecha_venta = models.DateField(verbose_name="Fecha de venta")
    factura = models.ForeignKey(
        Factura,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='ventas',
        verbose_name="Factura"
    )

    @property
    def total(self):
        return self.cantidad * self.precio_unitario

    class Meta:
        verbose_name = "Venta"
        verbose_name_plural = "Ventas"
        ordering = ['-fecha_venta']

    def __str__(self):
        return f"{self.producto.nombre} x{self.cantidad} - {self.fecha_venta}"