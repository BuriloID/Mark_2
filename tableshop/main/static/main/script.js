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
});