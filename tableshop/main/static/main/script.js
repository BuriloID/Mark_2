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

document.addEventListener('DOMContentLoaded', function() {
    showSlide(slideIndex);
    sliderInterval = setInterval(autoSlide, 6000);
    const left = document.querySelector('.slider-arrow.left');
    const right = document.querySelector('.slider-arrow.right');
    if (left) left.onclick = () => plusSlide(-1);
    if (right) right.onclick = () => plusSlide(1);
    const kitchenImages = window.kitchenImages || [];
    let kitchenImgIndex = 0;
    const mainImg = document.getElementById('kitchen-main-img');
    const leftBtn = document.querySelector('.img-nav-left');
    const rightBtn = document.querySelector('.img-nav-right');
    if (mainImg && kitchenImages.length) {
        function showKitchenImg(idx) {
            kitchenImgIndex = (idx + kitchenImages.length) % kitchenImages.length;
            mainImg.src = kitchenImages[kitchenImgIndex];
        }
        if (leftBtn) leftBtn.onclick = function() { showKitchenImg(kitchenImgIndex - 1); };
        if (rightBtn) rightBtn.onclick = function() { showKitchenImg(kitchenImgIndex + 1); };
        mainImg.addEventListener('click', () => showKitchenImg(kitchenImgIndex + 1));}
});
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
