const boxes = document.querySelectorAll('.box');
const header = document.querySelector('.header');

// Debounce Function to Improve Performance
function debounce(func, wait = 30) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Scroll Event Listener
window.addEventListener('scroll', debounce(() => {
  checkBoxes();
  toggleHeader();
}, 10)); // Adjusted delay for better responsiveness

// Function to Toggle Header Class on Scroll
function toggleHeader() {
  const scrolled = window.scrollY > 50;
  header.classList.toggle('scrolled', scrolled);
}

// Function to Animate Boxes on Scroll
function checkBoxes() {
  const triggerBottom = window.innerHeight * 0.7; // More precise trigger point

  boxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;
    const isVisible = boxTop < triggerBottom;
    
    // Update only if there's a change to prevent unnecessary class toggling
    if (isVisible !== box.classList.contains('show')) {
      box.classList.toggle('show', isVisible);
      
      // Add delay for text and image animation
      if (isVisible) {
        const info = box.querySelector('.information');
        const img = box.querySelector('img');
        
        if (info) info.classList.add('text-animate');
        if (img) img.classList.add('image-animate');
      }
    }
  });
}


// Initial Check for Boxes on Page Load
document.addEventListener('DOMContentLoaded', checkBoxes);
