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

    //un gestionnaire d'événements nav bar
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href'); 
            const targetElement = document.querySelector(targetId); 

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

document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.progress-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const skillBar = entry.target;
            const skillLevel = skillBar.getAttribute('data-skill-level');

            if (entry.isIntersecting) {
                setTimeout(() => {
                    skillBar.style.transition = "width 1s ease-in-out"; 
                    skillBar.style.width = skillLevel;
                }, 100); 
            } else {
                skillBar.style.transition = "none"; 
                skillBar.style.width = "0"; 
            }
        });
    }, { threshold: 0.4 }); 

    skillBars.forEach(skillBar => observer.observe(skillBar));
});

  const portfolioSlider = document.querySelector('.portfolio-slider');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const totalItems = portfolioItems.length;
  
  let currentIndex = 0;
  let visibleItems = window.innerWidth <= 768 ? 1 : 3; 
  function updateSlider() {
      const itemWidth = portfolioItems[0].offsetWidth + 22; 
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

  window.addEventListener('resize', () => {
      visibleItems = window.innerWidth <= 768 ? 1 : 3;
      currentIndex = Math.min(currentIndex, totalItems - visibleItems); 
      updateSlider();
  });
  
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


document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.parcours-item');
  const nextBtn = document.getElementById('nextParcours');
  const prevBtn = document.getElementById('prevParcours');
  let currentIndex = 0;

  function updateCarousel() {
    items.forEach((item, index) => {
      item.classList.toggle('active', index === currentIndex);
    });
    const offset = -currentIndex * 100;
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // toggle déroulant
  document.querySelectorAll('.toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.parcours-item');
      parent.classList.toggle('expanded');
    });
  });

  updateCarousel();
});
