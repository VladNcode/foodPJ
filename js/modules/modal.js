export const modal = function () {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');

  const btnsOpenModal = document.querySelectorAll('[data-modal]');
  modal.classList.add('hide');

  const showModal = function () {
    modal.classList.remove('hide');
    overlay.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
  };

  const hideModal = function () {
    modal.classList.add('hide');
    overlay.classList.add('hide');
    document.body.style.overflow = '';
  };

  btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', function () {
      showModal();
    });
  });

  document.addEventListener('click', function (e) {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      hideModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hide')) {
      hideModal();
    }
  });

  const modalTimer = setTimeout(showModal, 50000);

  const showModalByScroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      showModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);
};
