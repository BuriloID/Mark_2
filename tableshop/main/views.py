import requests
from django.shortcuts import render, get_object_or_404
from .models import Kitchen, Garder
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

TELEGRAM_TOKEN = '7632758284:AAGa3qFxnukMyHD194Ypduis0a2d8rHfcqw'
TELEGRAM_CHAT_ID = '5208308918'  # например, 123456789
@csrf_exempt
def send_to_telegram(request):
    if request.method == 'POST':
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        phone = request.POST.get('phone', '')
        message = request.POST.get('message', '')
        text = (f"📝 Новая заявка с сайта Премьер Фасад:\n"
                f"👤 Имя: {name}\n"
                f"📧 Email: {email}\n"
                f"📞 Телефон: {phone}\n"
                f"💬 Сообщение: {message}")
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
def garders(request):
    garders = Garder.objects.all()
    return render(request, 'main/garders.html', {'garders': garders})