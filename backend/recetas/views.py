from rest_framework import viewsets
from .models import ItemReceta
from .serializers import ItemRecetaSerializer


class ItemRecetaViewSet(viewsets.ModelViewSet):
    queryset = ItemReceta.objects.all()
    serializer_class = ItemRecetaSerializer
