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
    creado = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")

    class Meta:
        verbose_name = "Ingrediente"
        verbose_name_plural = "Ingredientes"
        ordering = ['nombre']

    def __str__(self):
        return f"{self.nombre} ({self.unidad})"