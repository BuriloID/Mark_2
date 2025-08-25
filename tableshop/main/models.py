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

    def __str__(self):
        return self.title

class GarderImage(models.Model):
    garder = models.ForeignKey(Garder, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField("Дополнительное изображение", upload_to="garders/additional/")

    def __str__(self):
        return f"Фото для {self.garder.title}"
class Bath(models.Model):
    title = models.CharField("Название ванной", max_length=200)
    main_image = models.ImageField("Главное изображение", upload_to="bath/main/")
    size = models.CharField("Размер шкафа на фото", max_length=100)
    corpus = models.CharField("Корпус", max_length=200)
    mdf_thickness = models.CharField("Толщина МДФ", max_length=100)
    drilling = models.CharField("Присадка", max_length=200)

    def __str__(self):
        return self.title


class BathImage(models.Model):
    bath = models.ForeignKey(
        Bath,
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name="Ванная"
    )
    image = models.ImageField("Дополнительное изображение", upload_to="bath/additional/")

    def __str__(self):
        return f"Фото для {self.bath.title}"

class Facade(models.Model):
    title = models.CharField(max_length=255)
    main_image = models.ImageField(upload_to='facades/')
    type = models.CharField(max_length=255, verbose_name="Вид фасада")
    frame = models.CharField(max_length=255, verbose_name="Рамка")
    panel = models.CharField(max_length=255, verbose_name="Филёнка")

    def __str__(self):
        return self.title

class FinishingMaterial(models.Model):
    facade = models.ForeignKey(Facade, related_name='materials', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.facade.title}: {self.name}"

class FinishingColor(models.Model):
    material = models.ForeignKey(FinishingMaterial, related_name='colors', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='facades/colors/')  # <--- Картинка-образец
    code = models.CharField(max_length=50, blank=True, help_text="Код цвета или артикул")

    def __str__(self):
        return f"{self.material.name}: {self.name}"