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

  const nextBtn = document.createElement('span');
  nextBtn.classList.add('lightbox-next');
  nextBtn.innerHTML = '&#10095;';
  lightbox.appendChild(nextBtn);

  const prevBtn = document.createElement('span');
  prevBtn.classList.add('lightbox-prev');
  prevBtn.innerHTML = '&#10094;';
  lightbox.appendChild(prevBtn);

  let currentIndex = 0;

  function showImage(index) {
    img.src = images[index].src;
    lightbox.classList.add('active'); // Show lightbox
    currentIndex = index;
  }

  // Open lightbox on image click
  images.forEach((image, index) => {
    image.addEventListener('click', () => showImage(index));
  });

  // Close lightbox
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Next / Prev buttons
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    } else if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    }
  });
});
