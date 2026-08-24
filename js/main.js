document.addEventListener('DOMContentLoaded', () => {
  initialiseTheme();
  initialiseCart();
  initialiseNavigation();
  initialiseSearch();
  initialiseModals();
  initialiseDetails();
  initialiseSlideshow();
  initialiseCarousels();

  // Contact form submission feedback
  document.getElementById('contact-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you for contacting Bounty! Our concierge team will reach out to you shortly.');
    event.target.reset();
  });
});
