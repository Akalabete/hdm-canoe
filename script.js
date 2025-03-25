let currentSlide = 0;

const slides = document.querySelectorAll('.carousel__photo');
const totalSlides = slides.length;

document.querySelector('.carousel__button--next').addEventListener('click', moveNext);
document.querySelector('.carousel__button--prev').addEventListener('click', movePrev);

function moveNext() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % totalSlides; // Passe à la diapositive suivante
    slides[currentSlide].classList.add('active');
}

function movePrev() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Passe à la diapositive précédente
    slides[currentSlide].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
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
});
