
document.addEventListener('click', (event) => {
  createFirework(event.clientX, event.clientY);
});

function createFirework(x, y) {
  const numParticles = 20;
  for (let i = 0; i < numParticles; i++) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    firework.style.setProperty('--x', `${Math.random() * 400 - 200}px`);
    firework.style.setProperty('--y', `${Math.random() * 400 - 200}px`);
    document.body.appendChild(firework);

    setTimeout(() => {
      firework.remove();
    }, 1200);  // Remove after animation is complete
  }
}


let currentSectionIndex = 0;
const sections = document.querySelectorAll('section');
let isScrolling = false; // Flag to control scrolling

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return; // Prevent scrolling out of bounds
    sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleScroll(event) {
    event.preventDefault(); // Prevent default scroll behavior

    if (isScrolling) return; // Prevent further scrolling if already scrolling

    isScrolling = true; // Set scrolling to true

    if (event.deltaY > 0) {
        // Scrolling down
        currentSectionIndex++;
    } else {
        // Scrolling up
        currentSectionIndex--;
    }

    scrollToSection(currentSectionIndex);

    // Set a timeout to reset the scrolling flag after a short delay (e.g., 800ms)
    setTimeout(() => {
        isScrolling = false; // Allow scrolling again
    }, 800);
}

// Prevent default scrolling with wheel event
window.addEventListener('wheel', handleScroll, { passive: false });

// For touch devices: Prevent default scrolling and handle touch swipes
let startY;

window.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY; // Get the initial touch position
});

window.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Prevent default scroll behavior
    const endY = event.touches[0].clientY;

    if (isScrolling) return; // Prevent further scrolling if already scrolling

    isScrolling = true; // Set scrolling to true

    if (startY > endY + 20) {
        // Swiped up
        currentSectionIndex++;
        scrollToSection(currentSectionIndex);
    } else if (startY < endY - 20) {
        // Swiped down
        currentSectionIndex--;
        scrollToSection(currentSectionIndex);
    }

    // Set a timeout to reset the scrolling flag after a short delay (e.g., 800ms)
    setTimeout(() => {
        isScrolling = false; // Allow scrolling again
    }, 100);
}, { passive: false });

