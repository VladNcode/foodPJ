export const slider = function ({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  const slides = document.querySelectorAll(slide);
  const slider = document.querySelector(container);
  const btnLeft = document.querySelector(prevArrow);
  const btnRight = document.querySelector(nextArrow);
  const currentSlide = document.querySelector(currentCounter);
  const totalSlides = document.querySelector(totalCounter);
  const slidesWrapper = document.querySelector(wrapper);
  const slidesField = document.querySelector(field);
  const width = window.getComputedStyle(slidesWrapper).width;

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const dots = document.createElement('ol');
  dots.classList.add('carousel-indicators');
  slider.append(dots);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i);
    dot.classList.add('dot');
    dots.append(dot);
  }
  const dotsSelector = document.querySelectorAll('.dot');

  const activateDot = function (slide) {
    dotsSelector.forEach(dot => (dot.style.opacity = 0.5));
    dotsSelector.forEach(dot => (dot.style.backgroundColor = '#fff'));
    dotsSelector[slide].style.opacity = 1;
    dotsSelector[slide].style.backgroundColor = 'green';
  };

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slidesField.style.transform = `translatex(${-25 * slide}%)`;
    currentSlide.textContent = String(Math.trunc(curSlide + 1)).padStart(2, 0);
  };

  const init = function () {
    totalSlides.textContent = String(Math.trunc(slides.length)).padStart(2, 0);
    goToSlide(0);
    activateDot(0);
  };
  init();

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  slider.addEventListener('click', function (e) {
    if (e.target.classList.contains('dot')) {
      const slider = +e.target.dataset.slideTo;
      goToSlide(slider);
      activateDot(slider);
      curSlide = slider;
      currentSlide.textContent = `0${slider + 1}`;
    }
  });
};
