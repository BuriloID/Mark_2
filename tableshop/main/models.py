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
class Garder(models.Model):
    title = models.CharField("Название гардеробной", max_length=200)
    main_image = models.ImageField("Главное изображение", upload_to="garders/main/")
    size = models.CharField("Размер шкафа на фото", max_length=100)
    corpus = models.CharField("Корпус", max_length=200)
    mdf_thickness = models.CharField("Толщина МДФ", max_length=100)
    drilling = models.CharField("Присадка", max_length=200)
    # Дополнительные поля по желанию

    def __str__(self):
        return self.title

class GarderImage(models.Model):
    garder = models.ForeignKey(Garder, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField("Дополнительное изображение", upload_to="garders/additional/")

    def __str__(self):
        return f"Фото для {self.garder.title}"