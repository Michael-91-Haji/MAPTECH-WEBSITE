const menuButton = document.getElementById('menuButton');
const mobileNav = document.getElementById('mobileNav');

menuButton.addEventListener('click', () => {
  if (mobileNav.style.display === 'flex') {
    mobileNav.style.display = 'none';
  } else {
    mobileNav.style.display = 'flex';
  }
});

const mobileLinks = mobileNav.querySelectorAll('a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.style.display = 'none';
  });
});

const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});
fadeElements.forEach(el => fadeObserver.observe(el));


const showMoreBtn = document.getElementById("view-all-btn");
const hiddenServices = document.querySelectorAll(".service-card[id^='service-hidden']");
let isVisible = false;

showMoreBtn.addEventListener("click", () => {
  isVisible = !isVisible;
  hiddenServices.forEach(service => {
    service.style.display = isVisible ? "flex" : "none";
  });
  showMoreBtn.textContent = isVisible ? "Show Less" : "View All Services"; 

});

hiddenServices.forEach(service => {
  service.style.display = "none";
});

const menuIcon = document.getElementById('menu');
const showMenu = document.getElementById('humburger-menu');
const overlay = document.getElementById('overlay');

function toggleMenu() {
  const isShown = showMenu.classList.contains('show');
  if (isShown) {
    showMenu.classList.remove('show');
    overlay.style.display = 'none';
  } else {
    showMenu.classList.add('show');
    overlay.style.display = 'block';
  }
}

menuIcon.addEventListener('click', (e) => {
  toggleMenu();
  e.stopPropagation();
});

document.addEventListener('click', (e) => {
  if (!showMenu.contains(e.target) && showMenu.classList.contains('show')) {
    toggleMenu();
  }
});

showMenu.addEventListener('click', (e) => {
  e.stopPropagation();
});

overlay.addEventListener('click', () => {
  toggleMenu();
});
