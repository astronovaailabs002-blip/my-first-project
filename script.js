const loader = document.getElementById('pageLoader');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const navContainer = document.getElementById('primaryNav');
const backToTop = document.getElementById('backToTop');
const revealElements = document.querySelectorAll('.reveal');
const typingTarget = document.getElementById('typingText');
const contactForm = document.getElementById('contactForm');

const typingPhrases = [
  'Artificial Intelligence',
  'Web Development',
  'Logo Design',
  'Creative Branding',
  'Continuous Learning'
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {
  const currentPhrase = typingPhrases[phraseIndex];

  if (deleting) {
    charIndex -= 1;
  } else {
    charIndex += 1;
  }

  typingTarget.textContent = currentPhrase.slice(0, charIndex);

  let delay = deleting ? 55 : 90;

  if (!deleting && charIndex === currentPhrase.length) {
    delay = 1400;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    delay = 260;
  }

  window.setTimeout(typeWriter, delay);
}

function setActiveLink() {
  const scrollPosition = window.scrollY + 140;

  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) {
      return;
    }

    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

function toggleMenu(forceClose = false) {
  const isOpen = navContainer.classList.contains('is-open');
  const nextState = forceClose ? false : !isOpen;

  navContainer.classList.toggle('is-open', nextState);
  menuToggle.setAttribute('aria-expanded', String(nextState));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealElements.forEach((element) => observer.observe(element));

menuToggle.addEventListener('click', () => toggleMenu());

navLinks.forEach((link) => {
  link.addEventListener('click', () => toggleMenu(true));
});

window.addEventListener('scroll', () => {
  setActiveLink();
  backToTop.classList.toggle('show', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  contactForm.reset();
  window.alert(`Thank you, ${name || 'friend'}! Your message is ready to be sent.`);
});

window.addEventListener('load', () => {
  window.setTimeout(() => loader.classList.add('hide'), 700);
  typeWriter();
  setActiveLink();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    toggleMenu(true);
  }
});