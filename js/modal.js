function initialiseModals() {
  const loginModal = document.getElementById('login-modal');
  const openButton = document.getElementById('open-login-btn');
  const closeButton = document.getElementById('close-login-btn');
  const loginForm = loginModal?.querySelector('form');

  // Open modal
  openButton?.addEventListener('click', () => {
    if (loginModal) {
      loginModal.style.display = 'block';
    }
  });

  // Close modal
  closeButton?.addEventListener('click', () => {
    if (loginModal) {
      loginModal.style.display = 'none';
    }
  });

  // Submit form
  loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (loginModal) {
      loginModal.style.display = 'none';
    }
    alert('Login submitted successfully.');
  });

  // Click outside modal container to close
  window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
    }
  });
}
