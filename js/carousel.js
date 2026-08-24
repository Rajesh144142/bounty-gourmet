function initialiseCarousels() {
  document.querySelectorAll('.category-actions button').forEach((button) => {
    button.addEventListener('click', () => {
      const heading = button.closest('.category-heading');
      if (!heading) return;

      // Find the sibling product grid element
      const container = heading.nextElementSibling;
      if (!container || !container.classList.contains('product-grid')) return;

      // Check if this button is for shifting to the "next" item
      const isNext = button.classList.contains('next-btn') || 
                     button.querySelector('.bx-right-arrow-alt') !== null ||
                     button.getAttribute('aria-label')?.toLowerCase().includes('next');

      if (isNext) {
        if (container.firstElementChild) {
          container.append(container.firstElementChild);
        }
      } else {
        if (container.lastElementChild) {
          container.prepend(container.lastElementChild);
        }
      }
    });
  });
}
