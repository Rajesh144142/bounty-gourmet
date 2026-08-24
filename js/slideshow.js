function initialiseSlideshow() {
  let slideIndex = 0;

  function showSlides() {
    const slides = document.querySelectorAll('.mySlides');
    if (!slides.length) return;

    slides.forEach((slide) => {
      slide.style.display = 'none';
    });

    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].style.display = 'block';

    window.setTimeout(showSlides, 3500);
  }

  // Set the first slide visible immediately
  const slides = document.querySelectorAll('.mySlides');
  if (slides.length) {
    slides[0].style.display = 'block';
  }

  // Start rotation loop
  window.setTimeout(showSlides, 3500);
}
