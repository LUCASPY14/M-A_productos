from django.db import models

class Producto(models.Model):
    nombre = models.CharField(max_length=200, verbose_name="Nombre")
    descripcion = models.TextField(blank=True, verbose_name="Descripción")
    precio_venta = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name="Precio de venta"
    )
    activo = models.BooleanField(default=True, verbose_name="Activo")
    creado = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ['nombre']

    @property
    def costo_receta(self):
        return sum(
            (item.cantidad * item.ingrediente.costo_unitario for item in self.ingredientes_receta.all()),
            start=0,
        )

    @property
    def margen(self):
        return self.precio_venta - self.costo_receta

    @property
    def margen_porcentual(self):
        if not self.precio_venta:
            return 0
        return (self.margen / self.precio_venta) * 100

    def __str__(self):
        return self.nombre