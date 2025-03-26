console.log('Script chargé !');



document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé !');
    
    // Sélectionner tous les boutons qui contiennent un widget Guidap
    const reservButtons = document.querySelectorAll('button:has(guidap-booking-widget)');
    
    reservButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Trouver le widget Guidap dans le bouton
            const guidapWidget = this.querySelector('guidap-booking-widget');
            if (guidapWidget) {
                // Trouver le bouton dans le widget et simuler un clic
                const guidapButton = guidapWidget.querySelector('.button');
                if (guidapButton) {
                    guidapButton.click();
                    console.log('click');
                }
            }
        });
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
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            } 
        });
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call

    // 2. Gestion des vidéos
    const videoLinks = document.querySelectorAll('.video-list a');
    const videoContainer = document.getElementById('footerVideo');
    
    videoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const videoSrc = this.getAttribute('data-video');
            const videoPlayer = videoContainer.querySelector('video');
            if (videoPlayer) {
                videoPlayer.src = videoSrc;
                videoPlayer.play();
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

    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display='flex';
        } else {
            scrollToTopBtn.style.display='none';
        }
    });
});

/* burger handler */

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

