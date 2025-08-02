document.addEventListener('DOMContentLoaded', () => {
  // Tab functionality
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach((btn) => {
    btn.addEventListener('click', () => {
      // deactivate all
      tabLinks.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      // activate current
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-links a');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Specific handler for logo click to ensure it scrolls to top
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      const heroSection = document.querySelector('#hero');
      if (heroSection) {
        heroSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // Add scroll effect to navbar
  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.style.background = 'rgba(13, 13, 13, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = 'var(--bg)';
      navbar.style.backdropFilter = 'none';
    }

    lastScrollTop = scrollTop;
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Add fade-in class to sections and observe them
  const sections = document.querySelectorAll('.section, .about-content, .projects-content, .tab-content');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Add loading animation to profile picture
  const profilePic = document.querySelector('.profile-pic');
  if (profilePic) {
    profilePic.addEventListener('load', () => {
      profilePic.style.opacity = '1';
    });
  }
});