// Универсальная функция проверки согласия
function validateAgreement(checkboxId, errorElementId) {
    const agreementCheckbox = document.getElementById(checkboxId);
    const errorElement = document.getElementById(errorElementId);
    
    if (!agreementCheckbox) return true;
    if (!agreementCheckbox.checked) {
        if (errorElement) errorElement.style.display = 'block';
        alert('Пожалуйста, подтвердите согласие на обработку персональных данных');
        return false;
    }
    
    if (errorElement) errorElement.style.display = 'none';
    return true;
}

// Получение CSRF токена
function getCSRFToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue;
}

// Глобальные переменные
let slideIndex = 0;
let sliderInterval;
let productImgIndex = 0;
let kitchenImgIndex = 0;
let popupTimeout;

const slides = document.getElementsByClassName('slide');
const dotsContainer = document.getElementById('slider-dots');
const slider = document.querySelector('.slider');

// Функции слайдера
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

// Функции для изображений продуктов
function showProductImg(idx, productImages, mainImg) {
    if (!productImages.length) return;
    productImgIndex = (idx + productImages.length) % productImages.length;
    mainImg.classList.add('fading');
    
    setTimeout(() => {
        mainImg.src = productImages[productImgIndex];
        mainImg.onload = () => mainImg.classList.remove('fading');
    }, 200);
}

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

// Функции модальных окон
function openCalcModal() {
    document.getElementById('calcModal').style.display = 'flex';
}

function closeCalcModal() {
    document.getElementById('calcModal').style.display = 'none';
}

function openPopup() {
    document.getElementById('callback-popup').style.display = 'flex';
    const fabButton = document.getElementById('popupCallBtn');
    if (fabButton) {
        fabButton.style.display = 'none';
    }
    clearTimeout(popupTimeout);
}

function closePopup() {
    document.getElementById('callback-popup').style.display = 'none';
    const fabButton = document.getElementById('popupCallBtn');
    if (fabButton) {
        fabButton.style.display = 'flex';
    }
    clearTimeout(popupTimeout);
}

// Функции прокрутки
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

// Другие утилиты
function copyPhone() {
    const phone = '+7 (916) 715-99-55';
    navigator.clipboard.writeText(phone).then(() => {
        alert('Телефон скопирован: ' + phone);
    }).catch(err => {
        console.error('Не удалось скопировать телефон: ', err);
    });
}

function hidePreloader() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.classList.add("fade-out");
        document.body.classList.add('loaded');
    }
}

// Основной обработчик DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация прелоадера
    window.addEventListener("load", hidePreloader);
    setTimeout(hidePreloader, 2000);
    
    // Инициализация слайдера
    showSlide(slideIndex);
    sliderInterval = setInterval(autoSlide, 6000);
    
    const left = document.querySelector('.slider-arrow.left');
    const right = document.querySelector('.slider-arrow.right');
    
    if (left) left.onclick = () => plusSlide(-1);
    if (right) right.onclick = () => plusSlide(1);
    
    // Обработка касаний для слайдера
    if (slider) {
        let startX, endX;
        
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            if (startX > endX + 50) {
                plusSlide(1);
            } else if (startX < endX - 50) {
                plusSlide(-1);
            }
        });
    }
    // Свайп для страницы деталей товаров
    const productImageBlock = document.querySelector('.product-detail-imageblock');
    if (productImageBlock && window.innerWidth <= 768) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        productImageBlock.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        productImageBlock.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            const swipeThreshold = 50;
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Свайп влево - следующее изображение
                if (rightBtn) rightBtn.click();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Свайп вправо - предыдущее изображение
                if (leftBtn) leftBtn.click();
            }
        }, { passive: true });
    }
    // Инициализация навигации по изображениям продуктов
    const productImages = window.productImages || [];
    const mainImg = document.getElementById('product-main-img');
    const leftBtn = document.querySelector('.img-nav-left');
    const rightBtn = document.querySelector('.img-nav-right');
    
    if (mainImg && productImages.length) {
        mainImg.src = productImages[0];
        productImgIndex = 0;
        
        if (leftBtn) leftBtn.onclick = function() { 
            showProductImg(productImgIndex - 1, productImages, mainImg); 
        };
        
        if (rightBtn) rightBtn.onclick = function() { 
            showProductImg(productImgIndex + 1, productImages, mainImg); 
        };
        
        mainImg.addEventListener('click', () => showProductImg(productImgIndex + 1, productImages, mainImg));
    }
    
    // Обработка модального окна расчета
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
    
    if (calcModal) {
        window.addEventListener('click', function(event) {
            if (event.target === calcModal) {
                closeCalcModal();
            }
        });
    }
    
    // Обработка формы расчета
    if (calcForm) {
        calcForm.onsubmit = function(e) {
            e.preventDefault();
            
            // Проверка согласия
            if (!validateAgreement('cbx', 'agreementError')) {
                return;
            }
            
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
    
    // Обработка загрузки файлов
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
    
    // Обработка формы обратного звонка
    const callbackForm = document.getElementById('callback-form');
    
    if (callbackForm) {
        callbackForm.onsubmit = function(event) {
            event.preventDefault();
            
            // Проверка согласия
            if (!validateAgreement('cbx', 'agreementError')) {
                return;
            }
            
            const formData = new FormData(callbackForm);
            const submitBtn = callbackForm.querySelector('.call-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            fetch('/send_callback_to_telegram/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': getCSRFToken(), 
                }
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
            })
            .finally(() => {  
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        };
    }
    
    // Попап обратного звонка
    popupTimeout = setTimeout(() => {
        document.getElementById('callback-popup').style.display = 'flex';
    }, 45000);
    
    // Фильтр фасадов
    document.querySelectorAll('#facades-filter-form input[type=radio]').forEach((el) => {
        el.addEventListener('change', function() {
            this.form.submit();
        });
    });
    
    // Галерея изображений
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
    
    // Мозаика изображений
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
    
    // Навигационное меню
    const hamburger = document.querySelector('.hamburger input');
    const nav = document.getElementById('main-nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('change', () => {
            nav.classList.toggle('active', hamburger.checked);
            nav.classList.remove('submenu-open');
        });
        
        document.querySelectorAll('.dropdown-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                if (window.matchMedia('(max-width: 800px)').matches) {
                    e.preventDefault();
                    nav.classList.add('submenu-open');
                }
            });
        });
        
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                nav.classList.remove('submenu-open');
            });
        });
        
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                nav.classList.remove('active', 'submenu-open');
                if (hamburger) hamburger.checked = false;
            }
        });
    }
    
    // Фильтр фасадов
    setTimeout(function() {
        const filterToggle = document.getElementById('filterToggle');
        const facadesFilter = document.getElementById('facadesFilter');
        
        if (filterToggle && facadesFilter) {
            filterToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                facadesFilter.classList.toggle('active');
                filterToggle.classList.toggle('active');
            });
            
            document.addEventListener('click', function(e) {
                if (!facadesFilter.contains(e.target) && 
                    !filterToggle.contains(e.target) && 
                    facadesFilter.classList.contains('active')) {
                    facadesFilter.classList.remove('active');
                    filterToggle.classList.remove('active');
                }
            });
            
            facadesFilter.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }, 1000);
    
    // Обработка прокрутки
    window.onscroll = scrollFunction;
});