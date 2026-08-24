from django.db import models

class Factura(models.Model):
    numero_factura = models.CharField(
        max_length=50,
        unique=True,
        verbose_name="Número de factura preimpresa"
    )
    fecha_emision = models.DateField(verbose_name="Fecha de emisión")
    total_almacenado = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0,
        verbose_name="Monto total almacenado"
    )
    creado = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de registro")

    @property
    def total_calculado(self):
        return sum(venta.total for venta in self.ventas.all())

    class Meta:
        verbose_name = "Factura"
        verbose_name_plural = "Facturas"
        ordering = ['-fecha_emision']

    def __str__(self):
        return f"Factura {self.numero_factura} - {self.fecha_emision}"