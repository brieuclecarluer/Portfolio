window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navMenu = document.getElementById('nav-menu');
            const burger = document.getElementById('burger');
            navMenu.classList.remove('active');
            burger.classList.remove('active');
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const burger = document.getElementById('burger');
const navMenu = document.getElementById('nav-menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navMenu.contains(e.target)) {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.experience-item').forEach(item => {
    observer.observe(item);
});

const travelData = [
    {
        image: 'assets/stemilion.jpeg',
        title: 'Exploration urbaine',
        description: 'Découvrir de nouvelles villes, seul ou entre amis, pour s\'immerger dans différentes cultures et architectures.'
    },
    {
        image: 'assets/chien.jpeg',
        title: 'Photographie Animalière',
        description: 'Après un roadtrip sur la cote ouest Francaise, j\'ai eu la chance de capturer ce moment avec un chien très joueur a Clisson.'
    },
    {
        image: 'assets/stmalo.jpeg',
        title: 'Escapades côtières',
        description: 'Explorer les plages et les côtes pour profiter du calme de l\'océan et découvrir de nouveaux horizons. Cette photo fut prise par un ami à moi lorsque nous faisions le tour de la Baie de St Malo à pied.'
    }
];

let currentTravelIndex = 0;

function updateTravelSlide(index) {
    const data = travelData[index];
    document.getElementById('travelImage').src = data.image;
    document.getElementById('travelTitle').textContent = data.title;
    document.getElementById('travelDescription').textContent = data.description;

    document.querySelectorAll('.travel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

document.querySelectorAll('.travel-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        currentTravelIndex = parseInt(dot.dataset.index);
        updateTravelSlide(currentTravelIndex);
    });
});

setInterval(() => {
    currentTravelIndex = (currentTravelIndex + 1) % travelData.length;
    updateTravelSlide(currentTravelIndex);
}, 5000);

const track = document.getElementById('projectsTrack');
const prevBtn = document.getElementById('prevProject');
const nextBtn = document.getElementById('nextProject');
let currentIndex = 0;

function getVisibleCards() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1200) return 2;
    return 3;
}

function updateCarousel() {
    const cardWidth = 380;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    const maxIndex = Math.max(0, track.children.length - getVisibleCards());
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    const maxIndex = Math.max(0, track.children.length - getVisibleCards());
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

updateCarousel();

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const maxIndex = Math.max(0, track.children.length - getVisibleCards());
        currentIndex = Math.min(currentIndex, maxIndex);
        updateCarousel();
    }, 250);
});
