from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('contacts/', views.contacts, name='contacts'),
    path('about/', views.about, name='about'),
    path('api/gallery-images/', views.gallery_images, name='gallery_images'),
    path('kitchen/', views.kitchen, name='kitchen'),
    path('facades/', views.facades, name='facades'),
    path('kitchen/<int:pk>/', views.kitchen_detail, name='kitchen_detail'),
    path('garders/', views.garders, name='garders'),
    path('garders/<int:pk>/', views.garder_detail, name='garder_detail'),
    path('send_to_telegram/', views.send_to_telegram, name='send_to_telegram'),
    path('send_callback_to_telegram/', views.send_callback_to_telegram, name='send_callback_to_telegram'),
    path('facades/<int:pk>/', views.facade_detail, name='facade_detail')
]