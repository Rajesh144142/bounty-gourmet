function initialiseNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#myTopnav');

  menuToggle?.addEventListener('click', () => {
    if (!navigation) return;
    const isOpen = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'bx bx-x' : 'bx bx-menu';
    }
  });

  // Smooth scroll and handle menu toggle closing for standard anchors
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '') return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        event.preventDefault();

        // Close mobile drawer if open
        if (navigation) {
          navigation.classList.remove('open');
          menuToggle?.setAttribute('aria-expanded', 'false');
          const icon = menuToggle?.querySelector('i');
          if (icon) {
            icon.className = 'bx bx-menu';
          }
        }

        // Disable scroll snapping temporarily to let scrolling finish smoothly
        document.documentElement.classList.add('no-snap');

        // Calculate exact pixel offset depending on target section
        let offset = 64; // main header height
        if (targetElement.closest('.products-section') || targetElement.classList.contains('product-category')) {
          offset = 149; // main header + sticky section heading height
        }

        const targetPosition = targetElement.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Restore snapping after the transition
        setTimeout(() => {
          const searchInput = document.querySelector('.searchInput');
          if (!searchInput || searchInput.value === '') {
            document.documentElement.classList.remove('no-snap');
          }
        }, 800);
      }
    });
  });

  // Category Tabs Scroll Integration
  document.querySelectorAll('.category-tab').forEach((tab) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = tab.getAttribute('data-target');
      if (!targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Clear search input if any active search to show all categories again
        const searchInput = document.querySelector('.searchInput');
        if (searchInput && searchInput.value !== '') {
          searchInput.value = '';
          searchInput.dispatchEvent(new Event('input'));
        }

        // Disable scroll snapping temporarily
        document.documentElement.classList.add('no-snap');

        // Scroll to target (offset 149px for products)
        const targetPosition = targetElement.offsetTop - 149;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Toggle active styling
        document.querySelectorAll('.category-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        // Restore snapping after scroll
        setTimeout(() => {
          if (!searchInput || searchInput.value === '') {
            document.documentElement.classList.remove('no-snap');
          }
        }, 800);
      }
    });
  });

  // Track active section on scroll and highlight topnav links & category tabs
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.topnav > a, .dropdown-content a');

  function updateActiveLink() {
    let currentActiveId = '';
    const scrollPosition = window.scrollY + 200; // offset for sticky header height

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentActiveId = section.getAttribute('id') || '';
      }
    });

    if (currentActiveId) {
      // Update main navigation active states
      navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        if (href === `#${currentActiveId}`) {
          link.classList.add('active');
          const dropbtn = link.closest('.dropdown')?.querySelector('.dropbtn');
          if (dropbtn) dropbtn.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Clear main dropbtn active states if no dropdown item is active
      document.querySelectorAll('.dropdown').forEach((dropdown) => {
        const hasActiveChild = dropdown.querySelector('.dropdown-content a.active');
        if (!hasActiveChild) {
          dropdown.querySelector('.dropbtn')?.classList.remove('active');
        }
      });

      // Update sticky category tabs active states
      document.querySelectorAll('.category-tab').forEach((tab) => {
        const target = tab.getAttribute('data-target') || '';
        if (target === `#${currentActiveId}`) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('resize', updateActiveLink);
  updateActiveLink();
}
