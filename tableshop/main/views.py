from django.shortcuts import render, get_object_or_404
from .models import Kitchen

def index(request):
    return render(request, "main/index.html")
def contacts(request):
    return render(request, "main/contacts.html")
def kitchen(request):
    kitchens = Kitchen.objects.all()
    return render(request, 'main/kitchen.html', {'kitchens': kitchens})
def facades(request):
    return render(request, 'main/facades.html')
def kitchen_detail(request, pk):
    kitchen = get_object_or_404(Kitchen, pk=pk)
    images = kitchen.images.all()  # ← вот так правильно!
    return render(request, 'main/kitchen_detail.html', {
        'kitchen': kitchen,
        'images': images,
    })
def garder(request):
    kitchens = Kitchen.objects.all()
    return render(request, 'main/garders.html', {'kitchens': kitchens})