document.addEventListener("DOMContentLoaded", () => {
    const galleryImages = document.querySelectorAll(".lightbox-gallery img");
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox-overlay");
    lightbox.innerHTML = `
      <button class="lightbox-close">&times;</button>
      <button class="lightbox-prev">&#10094;</button>
      <div class="lightbox-content">
        <img src="" alt="Lightbox Image">
      </div>
      <button class="lightbox-next">&#10095;</button>
    `;
    document.body.appendChild(lightbox);
  
    const lightboxImg = lightbox.querySelector(".lightbox-content img");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const prevBtn = lightbox.querySelector(".lightbox-prev");
    const nextBtn = lightbox.querySelector(".lightbox-next");
    let currentIndex = 0;
  
    const showLightbox = (index) => {
      currentIndex = index;
      lightboxImg.src = galleryImages[currentIndex].src;
      lightbox.classList.add("active");
    };
  
    const hideLightbox = () => {
      lightbox.classList.remove("active");
    };
  
    const showNext = () => {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      lightboxImg.src = galleryImages[currentIndex].src;
    };
  
    const showPrev = () => {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      lightboxImg.src = galleryImages[currentIndex].src;
    };
  
    galleryImages.forEach((img, index) => {
      img.addEventListener("click", () => {
        showLightbox(index);
      });
    });
  
    closeBtn.addEventListener("click", hideLightbox);
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);
  
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") hideLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    });
  });
  