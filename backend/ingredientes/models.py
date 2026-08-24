from django.db import models

class Ingrediente(models.Model):
    nombre = models.CharField(max_length=200, verbose_name="Nombre")
    unidad = models.CharField(max_length=50, verbose_name="Unidad de medida")  # kg, litro, unidad, etc.
    stock_actual = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name="Stock actual"
    )
    costo_compra = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
        verbose_name="Costo de la última compra",
        help_text="Precio pagado por la cantidad indicada en 'Cantidad comprada'."
    )
    cantidad_compra = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=1,
        verbose_name="Cantidad comprada",
        help_text="En la misma unidad de medida (ej: si Unidad es 'gr', cargar la compra en gramos)."
    )
    creado = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")

    class Meta:
        verbose_name = "Ingrediente"
        verbose_name_plural = "Ingredientes"
        ordering = ['nombre']

    @property
    def costo_unitario(self):
        if not self.cantidad_compra:
            return 0
        return self.costo_compra / self.cantidad_compra

    def __str__(self):
        return f"{self.nombre} ({self.unidad})"