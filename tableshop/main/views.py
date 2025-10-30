import requests
from django.shortcuts import render, get_object_or_404
from .models import Kitchen, Garder, Facade, Bath #Door
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse



TELEGRAM_TOKEN = '7792957968:AAGNZ-YBFhyvU-Ws3ruLj9K3iw5ZD1CHZLg'
TELEGRAM_CHAT_ID = '5208308918'  
@csrf_exempt
def send_to_telegram(request):
    if request.method == 'POST':
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        phone = request.POST.get('phone', '')
        message = request.POST.get('message', '')
        product_name = request.POST.get('product_name', '')
        product_url = request.POST.get('product_url', '')
        product_type = request.POST.get('product_type', '')
        text = (f"📝 Новая заявка с сайта Премьер Фасад:\n"
                f"👤 Имя: {name}\n"
                f"📧 Email: {email}\n"
                f"📞 Телефон: {phone}\n"
                f"💬 Сообщение: {message}")
        if product_name or product_url or product_type:
            text += "\n📦 Детали заказа:\n"
            if product_name:
                text += f"• Товар: {product_name}\n"
            if product_url:
                text += f"• Ссылка: {product_url}\n"
            if product_type:
                text += f"• Тип: {product_type}\n"
        url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
        data = {'chat_id': TELEGRAM_CHAT_ID, 'text': text}
        requests.post(url, data=data)
        if request.FILES.get('attachment'):
            file_obj = request.FILES['attachment']
            file_type = file_obj.content_type
            send_url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendDocument"
            files = {'document': (file_obj.name, file_obj.read(), file_type)}
            data = {'chat_id': TELEGRAM_CHAT_ID,
                    'caption': f"Вложение к заявке от {name}"}
            resp = requests.post(send_url, files=files, data=data)
            return JsonResponse({'ok': True, 'telegram': resp.json()})
        return JsonResponse({'ok': True})
    return JsonResponse({'ok': False, 'error': 'Only POST allowed'}, status=400)
@csrf_exempt
def send_callback_to_telegram(request):
    if request.method == 'POST':
        day = request.POST.get('day', '')
        time = request.POST.get('time', '')
        phone = request.POST.get('phone', '')
        text = (f"📞 Перезвонить клиенту!\n"
                f"День: {day}\n"
                f"Время: {time}\n"
                f"Телефон: {phone}")
        url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
        data = {
            'chat_id': TELEGRAM_CHAT_ID,
            'text': text
        }
        resp = requests.post(url, data=data)
        return JsonResponse({'ok': True, 'telegram': resp.json()})
    return JsonResponse({'ok': False, 'error': 'Only POST allowed'}, status=400)
def index(request):
    return render(request, "main/index.html")
def politic(request):
    return render(request, "main/politic.html")
def contacts(request):
    return render(request, "main/contacts.html")
def door(request):
    #doors = Door.objects.all()
    return render(request, "main/door.html") #, {'doors': doors})
def ready_products(request):
    return render(request, "main/ready_products.html")
def kitchen(request):
    kitchens = Kitchen.objects.all()
    return render(request, 'main/kitchen.html', {'kitchens': kitchens})
def facades(request):
    return render(request, 'main/facades.html')
def kitchen_detail(request, pk):
    kitchen = get_object_or_404(Kitchen, pk=pk)
    images = kitchen.images.all() 
    return render(request, 'main/kitchen_detail.html', {
        'kitchen': kitchen,
        'images': images,
        'product_type': 'Кухни',
    })
def garders(request):
    garders = Garder.objects.all()
    return render(request, 'main/garders.html', {'garders': garders})
def garder_detail(request, pk):
    garder = get_object_or_404(Garder, pk=pk)
    images = garder.images.all() 
    return render(request, 'main/garder_detail.html', {
        'garder': garder,
        'images': images,
        'product_type': 'Гардеробные',
    })
def bath(request):
    baths = Bath.objects.all()
    return render(request, 'main/bath.html', {'baths': baths})
def bath_detail(request, pk):
    bath = get_object_or_404(Bath, pk=pk)
    images = bath.images.all() 
    return render(request, 'main/bath_detail.html', {
        'bath': bath,
        'images': images,
        'product_type': 'Мебель для ванной',
    })
def facades(request):
    types = Facade.objects.values_list('type', flat=True).distinct()
    selected_type = request.GET.get('type')
    if selected_type and selected_type != 'all':
        facades = Facade.objects.filter(type=selected_type).order_by('id')
    else:
        facades = Facade.objects.all()
    return render(request, 'main/facades.html', {
        'facades': facades,
        'types': types,
        'selected_type': selected_type,
    })
def facade_detail(request, pk):
    facade = get_object_or_404(Facade, pk=pk)
    return render(request, 'main/facade_detail.html', {'facade': facade})
def about(request):
    return render(request, "main/about.html")
def gallery_images(request):
    base_url = "https://storage.yandexcloud.net/mark2/product/"
    product_images = [f"{base_url}{i}.jpg" for i in range(1, 66)]
    return JsonResponse({"images": product_images})
def gallery_craft_images(request):
    base_url = "https://storage.yandexcloud.net/mark2/craft/"
    craft_images = [f"{base_url}{i}.jpg" for i in range(1, 110)]
    return JsonResponse({"images": craft_images})