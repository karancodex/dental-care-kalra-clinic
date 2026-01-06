import './style.css';

// --- Initialization & Icons ---
const initIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.addEventListener('load', initIcons);
initIcons();

// --- Intersection Observer for Reveal Animations ---
const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
};

const revealObserver = new IntersectionObserver(revealCallback, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

const observeElements = () => {
  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });
};

observeElements();

// --- FAQ Accordion Logic ---
const faqContainer = document.getElementById('faq-container');
if (faqContainer) {
  const triggers = faqContainer.querySelectorAll('.faq-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const icon = trigger.querySelector('[data-lucide]');

      // Toggle current
      if (content.classList.contains('hidden')) {
        // Close others (optional, but good for UX)
        triggers.forEach(otherTrigger => {
          if (otherTrigger !== trigger) {
            const otherContent = otherTrigger.nextElementSibling;
            const otherIcon = otherTrigger.querySelector('[data-lucide]');
            otherContent.classList.add('hidden');
            otherIcon?.classList.remove('rotate-180');
          }
        });

        content.classList.remove('hidden');
        content.style.maxHeight = content.scrollHeight + "px"; // For smooth slide down if we add transition
        icon?.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        content.style.maxHeight = null;
        icon?.classList.remove('rotate-180');
      }
    });
  });
}

// --- Mobile Menu Logic ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // Change menu icon to X if open
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
      const isOpen = !mobileMenu.classList.contains('hidden');
      icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
      initIcons();
    }
  });
}

// --- Common Form Handling Function ---
const setupFormHandler = (formId, successId) => {
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);

  if (!form || !success) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation
    const nameInput = form.querySelector('[name="name"]');
    const phoneInput = form.querySelector('[name="phone"]');

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";

    if (name.length < 2) {
      alert('Please enter your full name');
      return;
    }

    if (phone.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Processing...</span>';
    submitBtn.disabled = true;

    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';

    emailjs.sendForm(serviceID, templateID, form)
      .then(() => {
        if (formId === 'hero-form') {
          success.classList.remove('hidden');
          form.reset();
        } else {
          form.classList.add('hidden');
          success.classList.remove('hidden');
          form.reset();
        }
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
      }, (err) => {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        alert('Booking request failed. Please try WhatsApp or Call directly.');
        console.error('EmailJS Error:', err);
      });
  });
};

// Initialize handlers for both forms
setupFormHandler('hero-form', 'form-success');
setupFormHandler('modal-booking-form', 'modal-success');

// --- Appointment Modal Logic ---
const modal = document.getElementById('appointment-modal');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const closeModal = document.getElementById('close-modal');
const modalSuccess = document.getElementById('modal-success');
const modalForm = document.getElementById('modal-booking-form');
const closeSuccess = document.getElementById('close-modal-success');

const openModal = (e) => {
  if (e) e.preventDefault();
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent scroll
  modalSuccess.classList.add('hidden');
  modalForm.classList.remove('hidden');

  // Animate modal content
  const content = modal.querySelector('.reveal');
  if (content) content.classList.add('active');
};

const hideModal = () => {
  modal.classList.add('hidden');
  document.body.style.overflow = ''; // Restore scroll
};

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', openModal);
});

if (closeModal) closeModal.addEventListener('click', hideModal);
if (closeSuccess) closeSuccess.addEventListener('click', hideModal);

// Close on backdrop click
document.getElementById('modal-backdrop')?.addEventListener('click', hideModal);

// --- Smooth Scrolling for Navigation ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || this.classList.contains('modal-trigger')) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Close mobile menu if open
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          initIcons();
        }
      }
    }
  });
});

// --- Header Scroll Effect ---
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

// Expose modal open globally for any specific triggers
window.modalOpen = openModal;
