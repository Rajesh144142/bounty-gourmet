function initialiseSearch() {
  const searchInput = document.querySelector('.searchInput');

  if (!searchInput) {
    console.error('Search input element (.searchInput) not found in the DOM.');
    return;
  }

  console.log('Search input found and search listener initialised.');

  // Listen to manual typing searches
  searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    console.log('Search query entered:', query);

    // Disable snap scroll during active search to allow scrolling matching products freely
    if (query === '') {
      document.documentElement.classList.remove('no-snap');
    } else {
      document.documentElement.classList.add('no-snap');
    }

    // Toggle product visibility based on search query matching title
    document.querySelectorAll('.product-box').forEach((product) => {
      const title = product.querySelector('.product-title')?.textContent.toLowerCase() || '';
      const matches = title.includes(query);
      product.hidden = !matches;
    });

    // Hide empty category sections to avoid scroll snapping/viewing empty headers
    document.querySelectorAll('.product-category').forEach((category) => {
      const hasVisibleProducts = Array.from(category.querySelectorAll('.product-box')).some(box => !box.hidden);
      // Restore default flex/block stylesheet styles dynamically using empty string
      category.style.display = hasVisibleProducts ? '' : 'none';
    });
  });

  // Reset filter when clicking topnav links, brand logo, or category tabs
  document.querySelectorAll('.topnav a, .brand, .category-tab').forEach((link) => {
    link.addEventListener('click', () => {
      document.documentElement.classList.remove('no-snap');
      if (searchInput.value !== '') {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
      }
    });
  });
}
