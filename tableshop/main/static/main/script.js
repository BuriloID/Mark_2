let slideIndex = 0;
let sliderInterval;
const slides = document.getElementsByClassName('slide');
const dotsContainer = document.getElementById('slider-dots');
const slider = document.querySelector('.slider');

function showSlide(n) {
    if (!slides.length) return;
    slideIndex = (n + slides.length) % slides.length;
    if (slider) {
        slider.style.transform = `translateX(-${slideIndex * 100}vw)`;
    }
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot' + (i === slideIndex ? ' active' : '');
            dot.onclick = () => showSlide(i);
            dotsContainer.appendChild(dot);
        }
    }
}
window.onscroll = function() { scrollFunction(); };
function scrollFunction() {
    const btn = document.getElementById("scrollTopBtn");
    if (!btn) return;
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function plusSlide(n) {
    showSlide(slideIndex + n);
    resetSliderInterval();
}
function autoSlide() {
    plusSlide(1);
}
function resetSliderInterval() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(autoSlide, 6000);
}
let kitchenImgIndex = 0;
function showKitchenImg(idx, kitchenImages, mainImg) {
    if (!kitchenImages.length) return;
    kitchenImgIndex = (idx + kitchenImages.length) % kitchenImages.length;
    mainImg.src = kitchenImages[kitchenImgIndex];
}
function openCalcModal() {
  document.getElementById('calcModal').style.display = 'flex';
}
function closeCalcModal() {
  document.getElementById('calcModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    showSlide(slideIndex);
    sliderInterval = setInterval(autoSlide, 6000);
    const left = document.querySelector('.slider-arrow.left');
    const right = document.querySelector('.slider-arrow.right');
    if (left) left.onclick = () => plusSlide(-1);
    if (right) right.onclick = () => plusSlide(1);
    const kitchenImages = window.kitchenImages || [];
    const mainImg = document.getElementById('kitchen-main-img');
    const leftBtn = document.querySelector('.img-nav-left');
    const rightBtn = document.querySelector('.img-nav-right');
    if (mainImg && kitchenImages.length) {
        // Показываем начальное изображение (на всякий случай)
        mainImg.src = kitchenImages[0];
        kitchenImgIndex = 0;

        if (leftBtn) leftBtn.onclick = function() { showKitchenImg(kitchenImgIndex - 1, kitchenImages, mainImg); };
        if (rightBtn) rightBtn.onclick = function() { showKitchenImg(kitchenImgIndex + 1, kitchenImages, mainImg); };
        mainImg.addEventListener('click', () => showKitchenImg(kitchenImgIndex + 1, kitchenImages, mainImg));
    }
    const openCalcBtn = document.getElementById('openCalcModal');
  const closeCalcBtn = document.getElementById('closeCalcModal');
  const calcModal = document.getElementById('calcModal');
  const calcForm = document.getElementById('calcForm');

  if (openCalcBtn && calcModal) {
    openCalcBtn.onclick = openCalcModal;
  }
  if (closeCalcBtn && calcModal) {
    closeCalcBtn.onclick = closeCalcModal;
  }
  if (calcForm) {
    calcForm.onsubmit = function(e) {
      e.preventDefault();
      const name = this.name.value.trim();
      const email = this.email.value.trim();
      const phone = this.phone.value.trim();
      const message = this.message.value.trim();
      let text = `Заявка с сайта\nКонтактное лицо: ${name}\nE-mail: ${email}\nТелефон: ${phone}`;
      if (message) text += `\nСообщение: ${message}`;
      const sellerPhone = '79539676218';
      const waLink = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(text)}`;
      window.open(waLink, '_blank');
      closeCalcModal();
    };
  }

  if (calcModal) {
    window.addEventListener('click', function(event) {
      if (event.target === calcModal) {
        closeCalcModal();
      }
    });
  }
});
function showKitchenImg(idx, kitchenImages, mainImg) {
    if (!kitchenImages.length) return;
    kitchenImgIndex = (idx + kitchenImages.length) % kitchenImages.length;
    mainImg.classList.add('fading');
    setTimeout(() => {
        mainImg.src = kitchenImages[kitchenImgIndex];
        mainImg.onload = () => mainImg.classList.remove('fading');
    }, 200);
}
console.log('main/script.js loaded');
let popupTimeout = setTimeout(() => {
  document.getElementById('callback-popup').style.display = 'flex';
}, 45000);
function openPopup() {
  document.getElementById('callback-popup').style.display = 'flex';
  clearTimeout(popupTimeout); 
}
function closePopup() {
  document.getElementById('callback-popup').style.display = 'none';
  clearTimeout(popupTimeout);
}

function sendWhatsApp(event) {
  event.preventDefault();
  const day = document.getElementById('day').value;
  const time = document.getElementById('time').value;
  const phone = document.getElementById('phone').value;

  const sellerPhone = '79539676218';
  const msg = encodeURIComponent(
    `Здравствуйте! Прошу перезвонить мне в ${day} в ${time}, мой номер: ${phone}`
  );
  const waLink = `https://wa.me/${sellerPhone}?text=${msg}`;
  window.open(waLink, '_blank');
  closePopup();
}
