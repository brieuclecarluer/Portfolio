function detecterSectionEntree() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            } else {
                entry.target.classList.remove('section-visible');
            }
        });
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');

    // Ajoute un gestionnaire d'événements nav bar
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href'); // Récupère le href
            const targetElement = document.querySelector(targetId); // Sélectionne l'élément cible

            const windowHeight = window.innerHeight;
            const elementHeight = targetElement.offsetHeight;

            const scrollPosition = targetElement.offsetTop - (windowHeight - elementHeight) / 2;

            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const accueilSection = document.getElementById('accueil');
    accueilSection.scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.scroll-section');

    window.addEventListener('scroll', function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.90) {
                
                section.classList.add('visible');
            } else {
                
                section.classList.remove('visible');
            }
        });
    });
});

window.addEventListener('scroll', function() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.progress-bar');
    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.15;
  
    if (sectionPosition < screenPosition) {
      skillBars.forEach(skillBar => {
        const skillLevel = skillBar.getAttribute('data-skill-level');
        skillBar.style.width = skillLevel;
      });
    }
  });


  const portfolioSlider = document.querySelector('.portfolio-slider');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const totalItems = portfolioItems.length;

let currentIndex = 0;
const visibleItems = 3; 

function updateSlider() {
    const itemWidth = portfolioItems[0].offsetWidth + 30; 
    const offset = -currentIndex * itemWidth;
    portfolioSlider.style.transform = `translateX(${offset}px)`;

    document.querySelector('.left-arrow').style.display = currentIndex === 0 ? 'none' : 'flex';
    document.querySelector('.right-arrow').style.display = currentIndex >= totalItems - visibleItems ? 'none' : 'flex';
}


function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
}

function nextSlide() {
    if (currentIndex < totalItems - visibleItems) {
        currentIndex++;
        updateSlider();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    currentIndex = 0; 
    updateSlider(); 
});

document.querySelector('.left-arrow').addEventListener('click', prevSlide);
document.querySelector('.right-arrow').addEventListener('click', nextSlide);

  






//burger
document.getElementById("burger-btn").addEventListener("click", function () {
    document.querySelector("header").classList.toggle("show-nav");
});
