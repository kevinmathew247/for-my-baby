/*==================== NAV TOGGLE ====================*/
const toggle = document.getElementById('nav-toggle');
const nav = document.querySelector('.nav__links');

if (toggle && nav) {
    toggle.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
}

/*==================== CLOSE MENU ON CLICK ====================*/
const navLinks = document.querySelectorAll('.nav__links a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('show');
    });
});


/*==================== ACTIVE LINK ON SCROLL ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        const link = document.querySelector('.nav__links a[href*=' + sectionId + ']');

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);


/*==================== SMOOTH SCROLL ====================*/
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


/*==================== FADE-IN ON SCROLL ====================*/
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.message-card, .timeline-card, .music-card, .photo-card, .track')
    .forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });


/*==================== 3D PARALLAX (HERO) ====================*/
const frame = document.querySelector('.frame');
const heroVisual = document.querySelector('.hero__visual');

if (frame && heroVisual && window.innerWidth > 980) {
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 10;
        const rotateX = ((y / rect.height) - 0.5) * -8;

        frame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
        frame.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
}


document.addEventListener('DOMContentLoaded', () => {
  const revealPhoto = document.querySelector('.reveal-photo');

  if (revealPhoto) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealPhoto.classList.add('is-visible');
            observer.unobserve(revealPhoto);
          }
        });
      },
      {
        threshold: 0.28,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(revealPhoto);
  }
});