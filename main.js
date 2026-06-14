// Header scroll effect
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
        const header = document.getElementById('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
        scrollTimeout = null;
    }, 10);
}, { passive: true });

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            document.getElementById('nav-menu').classList.remove('active');
            document.getElementById('burger').classList.remove('active');
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mobile menu toggle
const burger  = document.getElementById('burger');
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

// Scroll indicator
const scrollIndicator = document.getElementById('scrollIndicator');
const scrollRing      = document.getElementById('scrollRing');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const pct = window.scrollY / window.innerHeight;
            if (pct > 0.3) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
                const opacity = Math.max(0, 1 - pct * 3);
                const scale   = 1 + pct * 2;
                scrollRing.style.opacity   = opacity;
                scrollRing.style.transform = `translate(-50%,-50%) scale(${scale})`;
            }
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

scrollIndicator.addEventListener('click', () => {
    document.getElementById('presentation').scrollIntoView({ behavior: 'smooth' });
});

// Experience scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.experience-item').forEach(item => observer.observe(item));

// Travel carousel
const travelData = [
    {
        image: 'assets/stemilion.jpeg',
        title: 'Exploration urbaine',
        description: 'Découvrir de nouvelles villes, seul ou entre amis, pour s\'immerger dans différentes cultures et architectures.'
    },
    {
        image: 'assets/chien.jpeg',
        title: 'Photographie Animalière',
        description: 'Après un roadtrip sur la côte ouest française, j\'ai eu la chance de capturer ce moment avec un chien très joueur à Clisson.'
    },
    {
        image: 'assets/stmalo.jpeg',
        title: 'Escapades côtières',
        description: 'Explorer les plages et les côtes pour profiter du calme de l\'océan et découvrir de nouveaux horizons. Cette photo fut prise par un ami lors du tour de la Baie de St Malo à pied.'
    }
];

let currentTravelIndex = 0;
const travelImage       = document.getElementById('travelImage');
const travelTitle       = document.getElementById('travelTitle');
const travelDescription = document.getElementById('travelDescription');

function updateTravelSlide(index) {
    const data = travelData[index];
    travelImage.src         = data.image + '?v=' + index;
    travelTitle.textContent = data.title;
    travelDescription.textContent = data.description;
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

const prevTravel = document.getElementById('prevTravel');
const nextTravel = document.getElementById('nextTravel');

if (prevTravel) prevTravel.addEventListener('click', () => {
    currentTravelIndex = (currentTravelIndex - 1 + travelData.length) % travelData.length;
    updateTravelSlide(currentTravelIndex);
});

if (nextTravel) nextTravel.addEventListener('click', () => {
    currentTravelIndex = (currentTravelIndex + 1) % travelData.length;
    updateTravelSlide(currentTravelIndex);
});

setInterval(() => {
    currentTravelIndex = (currentTravelIndex + 1) % travelData.length;
    updateTravelSlide(currentTravelIndex);
}, 5000);

// Projects carousel
const track   = document.getElementById('projectsTrack');
const prevBtn = document.getElementById('prevProject');
const nextBtn = document.getElementById('nextProject');
let currentIndex = 0;

function getVisibleCards() {
    const w = window.innerWidth;
    if (w < 768)  return 1;
    if (w < 1200) return 2;
    return 3;
}

function updateCarousel() {
    const cardWidth = 374; // 350px card + 24px gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    const maxIndex = Math.max(0, track.children.length - getVisibleCards());
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) { currentIndex--; updateCarousel(); }
});

nextBtn.addEventListener('click', () => {
    const maxIndex = Math.max(0, track.children.length - getVisibleCards());
    if (currentIndex < maxIndex) { currentIndex++; updateCarousel(); }
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
}, { passive: true });
