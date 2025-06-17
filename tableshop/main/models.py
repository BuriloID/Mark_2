from django.db import models

class Kitchen(models.Model):
    name = models.CharField("Название кухни", max_length=200)
    facade_type = models.CharField("Вид фасада", max_length=200)
    facade_image = models.ImageField("Изображение фасада", upload_to='facade_images/')
    facade_coating = models.CharField("Покрытие фасадов", max_length=200)
    size = models.CharField("Размер кухни", max_length=100)
    island_size = models.CharField("Размеры кухонного острова", max_length=100, blank=True, null=True)
    
    def __str__(self):
        return self.name

class KitchenImage(models.Model):
    kitchen = models.ForeignKey(Kitchen, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField("Изображение кухни", upload_to='kitchen_images/')

    def __str__(self):
        return f"Фото для {self.kitchen.name}"