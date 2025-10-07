// js/carrusel.js
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");
    let index = 0;
    let autoPlay;
  
    // Crear puntos
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => showSlide(i));
      dotsContainer.appendChild(dot);
    });
  
    const dots = document.querySelectorAll(".dot");
  
    function showSlide(i) {
      slides[index].classList.remove("active");
      dots[index].classList.remove("active");
      index = (i + slides.length) % slides.length;
      slides[index].classList.add("active");
      dots[index].classList.add("active");
      restartAutoPlay();
    }
  
    function nextSlide() { showSlide(index + 1); }
    function prevSlide() { showSlide(index - 1); }
  
    next.addEventListener("click", nextSlide);
    prev.addEventListener("click", prevSlide);
  
    function autoPlaySlides() {
      autoPlay = setInterval(nextSlide, 5000);
    }
  
    function restartAutoPlay() {
      clearInterval(autoPlay);
      autoPlaySlides();
    }
  
    autoPlaySlides();
  });
  