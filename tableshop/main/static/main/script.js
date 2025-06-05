let slideIndex = 0;
let sliderInterval;
const slides = document.getElementsByClassName('slide');
const dotsContainer = document.getElementById('slider-dots');

function showSlide(n) {
    if (!slides.length) return;
    slideIndex = (n + slides.length) % slides.length;
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.toggle('active', i === slideIndex);
    }
    // Dots
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
});