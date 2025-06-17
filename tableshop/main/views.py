from django.shortcuts import render

def index(request):
    return render(request, "main/index.html")
def contacts(request):
    return render(request, "main/contacts.html")
def kitchen(request):
    return render(request, 'main/kitchen.html')
def facades(request):
    return render(request, 'main/facades.html')