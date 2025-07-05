document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.photo-gallery img');
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox-overlay');
  document.body.appendChild(lightbox);

  const img = document.createElement('img');
  img.classList.add('lightbox-img');
  lightbox.appendChild(img);

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('lightbox-close');
  closeBtn.innerHTML = '&times;';
  lightbox.appendChild(closeBtn);

  let currentIndex = 0;

  function showImage(index) {
    img.src = images[index].src;
    lightbox.classList.add('active');
    currentIndex = index;
  }

  // Click on images to open lightbox
  images.forEach((image, index) => {
    image.addEventListener('click', () => showImage(index));
  });

  // Close button
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  // Click outside image closes lightbox
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Next & Prev buttons
  const nextBtn = document.createElement('span');
  nextBtn.classList.add('lightbox-next');
  nextBtn.innerHTML = '&#10095;'; // Right arrow
  lightbox.appendChild(nextBtn);

  const prevBtn = document.createElement('span');
  prevBtn.classList.add('lightbox-prev');
  prevBtn.innerHTML = '&#10094;'; // Left arrow
  lightbox.appendChild(prevBtn);

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'ArrowRight':
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
        break;
      case 'ArrowLeft':
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
        break;
      case 'Escape':
        lightbox.classList.remove('active');
        break;
    }
  });
});
