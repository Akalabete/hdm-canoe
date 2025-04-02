document.addEventListener('DOMContentLoaded', function() {
    //windows resize handler with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const oldWidth = window.innerWidth;
            // Only reload if width actually changes (not on height changes)
            if (oldWidth !== window.innerWidth) {
                window.location.reload();
            }
            updateHeaderClass();
        }, 1000);
    });

    // 1. Gestion de la classe active pour la navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-desktop ul li a');
    const mobileNavLinks = document.querySelectorAll('.nav-mobile ul li a');
    function updateActiveLink() {
        let currentSection = '';
       
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 60) {
                currentSection = section.getAttribute('id')
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}-anchor` || link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            } 
        });

        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}-anchor` || link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink);
    // header class change
    function updateHeaderClass() {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header-container');
            const isMinified = header.classList.contains('not-home');
            const logoContainer = document.querySelector('.logo-container');
            if (window.scrollY > 150 && !isMinified) {
                logoContainer.style.overflow = 'visible';
                header.classList.add('not-home');
            } else if (window.scrollY < 50 && isMinified) {
                logoContainer.style.overflow = 'hidden';
                header.classList.remove('not-home');
            } 
        });
    }
    // 2. Gestion des vidéos
    const videoLinks = document.querySelectorAll('.video-list ul li');
    const videoContainer = document.getElementById('footerVideo');
    videoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const videoSrc = this.getAttribute('data-video');
            videoLinks.forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            if (videoContainer) {
                videoContainer.src = videoSrc;
                videoContainer.play();
            }
        });
    });
    // 3. Bouton de retour en haut
    const scrollToTopBtn = document.querySelector('.upbtn');
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display='flex';
        } else {
            scrollToTopBtn.style.display='none';
        }
    });
    // burger handler
    const burger = document.querySelector('.nav-mobile');
    const burgerContainer = document.querySelector('.nav-mobile-container');
    burger.addEventListener('click', () => {
        if(getComputedStyle(burger).display === 'flex') {
            burger.style.display = 'none';
            burger.style.height = '0';
            burgerContainer.style.display = 'block';
            burgerContainer.addEventListener('click', () => {
                burger.style.display = 'flex';
                burgerContainer.style.display = 'none';
                burger.style.height = 'auto';
            }); 
        } else {
            burgerContainer.style.display = 'none';
            burger.style.height = 'auto';
        }
    });
    //4 carousel
    const carouselContainer = document.querySelector('.cover-photo-container');
    const carouselNext = document.querySelector('.carousel-next');
    const carouselPrev = document.querySelector('.carousel-prev');
    let currentIndex = 0;
    carouselNext.addEventListener('click', () => {
        currentIndex = (currentIndex +1 + carouselImages.length) % carouselImages.length;
        updateCarousel(currentIndex, 'next');
        updateTimer()
    });
    carouselPrev.addEventListener('click', () => {
        currentIndex = (currentIndex -1 + carouselImages.length) % carouselImages.length;
        updateCarousel(currentIndex, 'prev');
        updateTimer()
    });
    let carouselTimer;
    const carouselImages = [
        {
            src: './assets/images/slider/supp1opti.webp',
            srcset: './assets/images/slider/supp1optism.webp 480w, ./assets/images/slider/supp1opti.webp 800w',
            sizes: '(max-width: 600px) 480px, 800px',
            alt: 'photo du débarcadère d\'Aubeterre Sur Drone'
        },
        {   
            src: './assets/images/slider/supp3opti.webp',
            srcset: './assets/images/slider/supp3optism.webp 480w, ./assets/images/slider/supp3opti.webp 800w',
            sizes: '(max-width: 600px) 480px, 800px',
            alt: 'photo du débarcadère d\'Aubeterre Sur Drone'
        },
        {
            src: './assets/images/slider/p32opti.webp',
            srcset: './assets/images/slider/p32optism.webp 480w, ./assets/images/slider/p32opti.webp 800w',
            sizes: '(max-width: 600px) 480px, 800px',
            alt: 'photo du débarcadère d\'Aubeterre Sur Drone'
        },
        {
            src: './assets/images/slider/p36opti.webp',
            srcset: './assets/images/slider/p36optism.webp 480w, ./assets/images/slider/p36opti.webp 800w',
            sizes: '(max-width: 600px) 480px, 800px',
            alt: 'photo du débarcadère d\'Aubeterre Sur Drone'
        }
    ]
    // auto carousel
    function updateTimer() {
        if (carouselTimer) {
            clearInterval(carouselTimer);
        }
        carouselTimer = setInterval(() => {
            currentIndex = (currentIndex + 1) % carouselImages.length;
            updateCarousel(currentIndex, 'next');
        }, 5000);
    }
    // update carousel  
    function updateCarousel(arg, direction) {
        const carouselImg = carouselContainer.querySelector('img');
        if (carouselImg) {
            if(direction === 'start') {
                injectImages(arg);
            }
            if (direction === 'next') {
                //carouselImg.style.transition = 'transform 0.5s ease-in-out';
                //carouselImg.style.transform = `translateX(100%)`;
                carouselImg.style.transition = 'opacity 0.2s ease-in-out';
                carouselImg.style.opacity = '0';
                setTimeout(() => {
                    //carouselImg.style.transition = 'none';
                // carouselImg.style.transform = 'translateX(0)';
                    injectImages(arg);
                    carouselImg.style.transition = 'opacity 0.3s ease-in-out';
                    carouselImg.style.opacity = '1';
                }, 300);
                
            } else if (direction === 'prev') {
                //carouselImg.style.transition = 'transform 0.5s ease-in-out';
                //carouselImg.style.transform = `translateX(-100%)`;
                carouselImg.style.transition = 'opacity 0.2s ease-in-out';
                carouselImg.style.opacity = '0';
                setTimeout(() => {
                    //carouselImg.style.transition = 'none';
                //carouselImg.style.transform = 'translateX(0)';
                    injectImages(arg);
                    carouselImg.style.transition = 'opacity 0.3s ease-in-out';
                    carouselImg.style.opacity = '1';
                }, 300);
            }
        }
    }
    function injectImages(index) {
        const carouselImg = carouselContainer.querySelector('img');
        carouselImg.src = carouselImages[index].src;
        carouselImg.srcset = carouselImages[index].srcset;
        carouselImg.sizes = carouselImages[index].sizes;
        carouselImg.alt = carouselImages[index].alt;
    }
    updateCarousel(0, 'start');
    updateTimer();
    updateActiveLink();
    updateHeaderClass();
});


