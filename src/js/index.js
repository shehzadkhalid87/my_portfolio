document.addEventListener('DOMContentLoaded', function () {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const moonIcon = document.getElementById('theme-icon-moon');
  const sunIcon = document.getElementById('theme-icon-sun');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const panel = document.getElementById('mobile-panel');

  // === 🌓 Theme Toggle ===
  const updateTheme = () => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    moonIcon.style.display = isDarkMode ? 'none' : 'inline-block';
    sunIcon.style.display = isDarkMode ? 'inline-block' : 'none';
    localStorage.setItem('darkMode', isDarkMode);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    updateTheme();
  };

  // Init theme on load
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const userPref = localStorage.getItem('darkMode');
  if (userPref === 'true' || (!userPref && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
  updateTheme();

  themeToggleBtn?.addEventListener('click', toggleTheme);

  // === 📱 Mobile Menu Toggle ===
  const toggleMobileMenu = () => {
    const isOpen = !mobileMenu.classList.contains('hidden');

    if (isOpen) {
      // Closing
      panel.classList.remove('translate-x-0');
      panel.classList.add('translate-x-full');
      mobileMenuIcon.classList.replace('fa-times', 'fa-bars');
      setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    } else {
      // Opening
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        panel.classList.remove('translate-x-full');
        panel.classList.add('translate-x-0');
      }, 10);
      mobileMenuIcon.classList.replace('fa-bars', 'fa-times');
    }
  };

  mobileMenuBtn?.addEventListener('click', toggleMobileMenu);

  // Hide menu on nav link click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
      }
    });
  });

  // Close menu if click outside panel
  document.addEventListener('click', (e) => {
    const isClickInsidePanel = e.target.closest('#mobile-panel');
    const isClickOnButton = e.target.closest('#mobile-menu-btn');
    const isOpen = !mobileMenu.classList.contains('hidden');

    if (isOpen && !isClickInsidePanel && !isClickOnButton) {
      toggleMobileMenu();
    }
  });


});
