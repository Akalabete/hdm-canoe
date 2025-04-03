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
            if (window.scrollY >= sectionTop - 100) {
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
            srcset:"./assets/images/slider/xs/slider1.webp 320w, ./assets/images/slider/sm/slider1.webp 480w, ./assets/images/slider/md/slider1.webp 800w",
            sizes:"(max-width: 480px) 320px, (max-width: 1023px) 480px, 800px",
            src:"./assets/images/slider/md/slider1.webp",
            alt:"Deux jeunes hommes dans des canoës monoplaces, en train de level le pouce" 
        },
        {   
            srcset:"./assets/images/slider/xs/slider2.webp 320w, ./assets/images/slider/sm/slider2.webp 480w, ./assets/images/slider/md/slider2.webp 800w",
            sizes:"(max-width: 480px) 320px, (max-width: 1023px) 480px, 800px",
            src:"./assets/images/slider/md/slider2.webp",
            alt:"deux canoës monoplaces sur la rivière Dronne, pris depuis un drone en hauteur" 
        },
        {   
            srcset:"./assets/images/slider/xs/slider3.webp 320w, ./assets/images/slider/sm/slider3.webp 480w, ./assets/images/slider/md/slider3.webp 800w",
            sizes:"(max-width: 480px) 320px, (max-width: 1023px) 480px, 800px",
            src:"./assets/images/slider/md/slider3.webp",
            alt:"Prise de vue d'un barrage avec cascade d'eau, depuis une trouée entre les arbres, magnifique rendu du soleil sur l'eau" 
        },
        {
            srcset:"./assets/images/slider/xs/slider4.webp 320w, ./assets/images/slider/sm/slider4.webp 480w, ./assets/images/slider/md/slider4.webp 800w",
            sizes:"(max-width: 480px) 320px, (max-width: 1023px) 480px, 800px",
            src:"./assets/images/slider/md/slider4.webp",
            alt:"Deux hommes dans un canoë double sur la rivière Dronne" 
        },
        {   
            srcset:"./assets/images/slider/xs/slider5.webp 320w, ./assets/images/slider/sm/slider5.webp 480w, ./assets/images/slider/md/slider5.webp 800w",
            sizes:"(max-width: 480px) 320px, (max-width: 1023px) 480px, 800px",
            src:"./assets/images/slider/md/slider5.webp",
            alt:"Prise de vue d'un bras de la Dronne avec barrage et cascade près de saint aulaye" 
        },
        {   
            srcset:"./assets/images/slider/xs/slider6.webp 320w, ./assets/images/slider/sm/slider6.webp 480w, ./assets/images/slider/md/slider6.webp 800w",
            sizes:"(max-width: 480px) 320px, (max-width: 1023px) 480px, 800px",
            src:"./assets/images/slider/md/slider6.webp",
            alt:"Cascade d'un barrage sur la Dronne avec des arbres en arrière plan" 
        },
        
        
        
        
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

        // Préchargement des images suivantes avec limite
        let remainingPreloads = Math.min(2, carouselImages.length - 1); // On limite à 2 préchargements
        let nextIndex = index;

        while (remainingPreloads > 0) {
            nextIndex = (nextIndex + 1) % carouselImages.length;
            
            // Vérifie si le lien de préchargement existe déjà
            const existingPreload = document.querySelector(`link[rel="preload"][href="${carouselImages[nextIndex].src}"]`);
            
            if (!existingPreload) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'image';
                preloadLink.href = carouselImages[nextIndex].src;
                preloadLink.setAttribute('data-carousel-preload', 'true');
                document.head.appendChild(preloadLink);
            }
            
            remainingPreloads--;
        }

        // Nettoyage des anciens préchargements
        const oldPreloads = document.querySelectorAll('link[data-carousel-preload="true"]');
        if (oldPreloads.length > 2) { // Garde seulement les 2 plus récents
            Array.from(oldPreloads)
                .slice(0, oldPreloads.length - 2)
                .forEach(link => link.remove());
        }
    }
    updateCarousel(0, 'start');
    updateTimer();
    updateActiveLink();
    updateHeaderClass();

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker enregistré avec succès');
                })
                .catch(error => {
                    console.log('Échec de l\'enregistrement du ServiceWorker:', error);
                });
        });
    }
});


