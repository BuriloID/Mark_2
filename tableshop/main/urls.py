from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('contacts/', views.contacts, name='contacts'),
    path('kitchen/', views.kitchen, name='kitchen'),
    path('facades/', views.facades, name='facades'),
    path('kitchen/<int:pk>/', views.kitchen_detail, name='kitchen_detail'),
]