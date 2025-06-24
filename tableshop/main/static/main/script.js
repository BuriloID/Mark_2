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
    const formData = new FormData(this);

    fetch('/send_to_telegram/', {
      method: 'POST',
      body: formData,
      // headers: { 'X-CSRFToken': csrftoken }, // если нужна csrf
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.ok) {
        alert('Заявка отправлена!');
        calcForm.reset();
        closeCalcModal();
      } else {
        alert('Ошибка отправки. Попробуйте ещё раз.');
      }
    })
    .catch(() => {
      alert('Ошибка соединения. Попробуйте ещё раз.');
    });
  };
}

  if (calcModal) {
    window.addEventListener('click', function(event) {
      if (event.target === calcModal) {
        closeCalcModal();
      }
    });
  }
  const fileDropArea = document.getElementById('fileDropArea');
  const fileInput = document.getElementById('attachment');
  const fileMsg = document.getElementById('fileMsg');

  if (fileDropArea && fileInput && fileMsg) {
    fileDropArea.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function() {
      if (fileInput.files.length > 0) {
        fileMsg.textContent = fileInput.files[0].name;
      } else {
        fileMsg.textContent = "Перетащите файл сюда или кликните для выбора";
      }
    });

    fileDropArea.addEventListener('dragover', function(e) {
      e.preventDefault();
      fileDropArea.classList.add('dragover');
    });
    fileDropArea.addEventListener('dragleave', function(e) {
      fileDropArea.classList.remove('dragover');
    });
    fileDropArea.addEventListener('drop', function(e) {
      e.preventDefault();
      fileDropArea.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
  }
  const callbackForm = document.getElementById('callback-form');
  if (callbackForm) {
    callbackForm.onsubmit = function(event) {
      event.preventDefault();
      const formData = new FormData(callbackForm);

      fetch('/send_callback_to_telegram/', {
        method: 'POST',
        body: formData,
      })
      .then(resp => resp.json())
      .then(data => {
        if (data.ok) {
          alert('Заявка отправлена! Мы вам перезвоним.');
          callbackForm.reset();
          closePopup(); // если нужно закрыть попап
        } else {
          alert('Ошибка отправки. Попробуйте ещё раз.');
        }
      })
      .catch(() => {
        alert('Ошибка соединения. Попробуйте ещё раз.');
      });
    };
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
