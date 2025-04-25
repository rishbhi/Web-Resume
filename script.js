// Mobile Navigation Toggle
const menuBtn = document.querySelector('.nav__menu__btn');
const navLinks = document.querySelector('.nav__links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when clicking on a link
const navLinksItems = document.querySelectorAll('.nav__links a');
navLinksItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Simplified Menu Carousels
document.querySelectorAll('.menu__carousel').forEach(carousel => {
  const items = carousel.querySelector('.menu__carousel-items');
  const dots = carousel.querySelectorAll('.carousel-dot');
  let currentIndex = 0;
  const totalItems = carousel.querySelectorAll('.menu__item').length;
  
  // Update carousel on initialization
  updateCarousel();
  
  // Event Listeners for dots
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      currentIndex = parseInt(e.target.getAttribute('data-index'));
      updateCarousel();
    });
  });
  
  // Auto rotate carousel every 5 seconds
  let autoRotate = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }, 5000);
  
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoRotate);
  });
  
  carousel.addEventListener('mouseleave', () => {
    autoRotate = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }, 5000);
  });
  
  function updateCarousel() {
    const translateValue = -currentIndex * 100 / 3; // Divide by 3 for the percentage
    items.style.transform = `translateX(${translateValue}%)`;
    
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
});

// Fixed Testimonial Swiper
const testimonialSwiper = new Swiper('.testimonialSwiper', {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    640: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  on: {
    init: function() {
      updateTestimonialSlides();
    },
    slideChange: function() {
      updateTestimonialSlides();
    },
    resize: function() {
      updateTestimonialSlides();
    }
  }
});

// Function to ensure center testimonial stays prominent
function updateTestimonialSlides() {
  const slides = document.querySelectorAll('.swiper-slide');
  slides.forEach((slide) => {
    // Reset all slides
    slide.style.transform = 'scale(0.85)';
    slide.style.opacity = '0.6';
    slide.style.zIndex = '0';
    
    // Enhance active slide
    if (slide.classList.contains('swiper-slide-active')) {
      slide.style.transform = 'scale(1.05)';
      slide.style.opacity = '1';
      slide.style.zIndex = '2';
    }
    // Slightly enhance adjacent slides
    else if (
      slide.classList.contains('swiper-slide-prev') ||
      slide.classList.contains('swiper-slide-next')
    ) {
      slide.style.transform = 'scale(0.9)';
      slide.style.opacity = '0.8';
      slide.style.zIndex = '1';
    }
  });
}

// Hero Carousel Animation
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    const children = heroContent.children;
    Array.from(children).forEach((child, index) => {
      child.style.animationDelay = `${index * 0.3}s`;
    });
  }
  
  // Section animations on scroll
  const sections = document.querySelectorAll('.section__container');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Form submission
  const bookingForm = document.querySelector('.contact__form form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your booking request! We will contact you shortly to confirm your reservation.');
      bookingForm.reset();
    });
  }
});

// Ensure smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Fix potential issues with resizing window
window.addEventListener('resize', () => {
  // Reinitialize testimonial slider to ensure proper layout
  if (testimonialSwiper) {
    testimonialSwiper.update();
  }
  
  // Update menu carousels on resize
  document.querySelectorAll('.menu__carousel').forEach(carousel => {
    const items = carousel.querySelector('.menu__carousel-items');
    const currentIndex = Array.from(carousel.querySelectorAll('.carousel-dot'))
      .findIndex(dot => dot.classList.contains('active'));
    
    if (currentIndex !== -1) {
      const translateValue = -currentIndex * 100 / 3;
      items.style.transform = `translateX(${translateValue}%)`;
    }
  });
});