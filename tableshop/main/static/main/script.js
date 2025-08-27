let slideIndex = 0;
let sliderInterval;
const slides = document.getElementsByClassName('slide');
const dotsContainer = document.getElementById('slider-dots');
const slider = document.querySelector('.slider');

function copyPhone() {
    const phone = '+7 (916) 715-99-55';
    navigator.clipboard.writeText(phone).then(() => {
      alert('Телефон скопирован: ' + phone);
    }).catch(err => {
      console.error('Не удалось скопировать телефон: ', err);
    });
  }
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
let productImgIndex = 0;
function showProductImg(idx, productImages, mainImg) {
    if (!productImages.length) return;
    productImgIndex = (idx + productImages.length) % productImages.length;
    mainImg.classList.add('fading');
    setTimeout(() => {
        mainImg.src = productImages[productImgIndex];
        mainImg.onload = () => mainImg.classList.remove('fading');
    }, 200);
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
    const productImages = window.productImages || [];
    const mainImg = document.getElementById('product-main-img');
    const leftBtn = document.querySelector('.img-nav-left');
    const rightBtn = document.querySelector('.img-nav-right');
    if (mainImg && productImages.length) {
        mainImg.src = productImages[0];
        productImgIndex = 0;
        if (leftBtn) leftBtn.onclick = function() { showProductImg(productImgIndex - 1, productImages, mainImg); };
        if (rightBtn) rightBtn.onclick = function() { showProductImg(productImgIndex + 1, productImages, mainImg); };
        mainImg.addEventListener('click', () => showProductImg(productImgIndex + 1, productImages, mainImg));
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
          closePopup(); 
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
function setMainImage(src, el) {
    const mainImg = document.getElementById('product-main-img');
    if (mainImg.src === src || mainImg.getAttribute('src') === src) return;
    document.querySelectorAll('.thumbnail-img').forEach(img => img.classList.remove('active'));
    el.classList.add('active');
    mainImg.classList.add('fading');
    setTimeout(() => {
        mainImg.src = src;
        mainImg.onload = () => {
            mainImg.classList.remove('fading');
        };
    }, 220); 
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
document.querySelectorAll('#facades-filter-form input[type=radio]').forEach((el) => {
    el.addEventListener('change', function() {
      this.form.submit();
    });
  });
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('galleryLeft');
  const nextBtn = document.getElementById('galleryRight');

  if (track) {
    let images = [];
    let current = 0;

    fetch('/api/gallery-images/')
      .then(res => res.json())
      .then(({ images: imgs }) => {
        images = imgs;
        imgs.forEach((url, i) => {
          const img = document.createElement('img');
          img.src = url;
          img.className = 'gallery-item';
          img.alt = `Партнёр ${i + 1}`;
          img.loading = 'lazy';
          if (i === 0) img.classList.add('active');
          img.addEventListener('click', () => {
            current = i;
            updateActive();
          });
          track.append(img);
        });
        updateActive();
      })
      .catch(console.error);

    function updateActive() {
      const nodes = track.querySelectorAll('.gallery-item');
      nodes.forEach((img, i) => {
        img.classList.toggle('active', i === current);
      });
      scrollToActive();
    }

    function scrollToActive() {
      const active = track.querySelector('.gallery-item.active');
      if (active) {
        active.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (!images.length) return;
        current = (current - 1 + images.length) % images.length;
        updateActive();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (!images.length) return;
        current = (current + 1) % images.length;
        updateActive();
      });
    }

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.classList.add('dragging');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.classList.remove('dragging');
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.classList.remove('dragging');
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 4;
      track.scrollLeft = scrollLeft - walk;
    });

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - track.offsetLeft;
      const walk = (x - startX) * 1;
      track.scrollLeft = scrollLeft - walk;
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const mosaicContainer = document.getElementById('mosaic');
  const loadMoreBtn = document.querySelector('.load-more');

  if (mosaicContainer && loadMoreBtn) {
    let allImages = [];
    let loadedCount = 0;
    const perLoad = 12;

    fetch('/api/gallery_craft_images/')
      .then(res => res.json())
      .then(data => {
        allImages = data.images;
        loadMoreMosaic();
      })
      .catch(console.error);

    function loadMoreMosaic() {
      const nextImages = allImages.slice(loadedCount, loadedCount + perLoad);
      nextImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'mosaic-item';
        img.loading = 'lazy';
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
        mosaicContainer.appendChild(img);
      });
      loadedCount += nextImages.length;

      if (loadedCount >= allImages.length) {
        loadMoreBtn.style.display = 'none';
      }
    }

    loadMoreBtn.addEventListener('click', loadMoreMosaic);
  }
});
