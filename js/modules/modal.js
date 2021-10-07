export const showModal = function (modalSelector, overlaySelector, modalTimer) {
  const modal = document.querySelector(modalSelector);
  const overlay = document.querySelector(overlaySelector);
  modal.classList.remove('hide');
  overlay.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimer) clearInterval(modalTimer);
};

export const hideModal = function (modalSelector, overlaySelector) {
  const modal = document.querySelector(modalSelector);
  const overlay = document.querySelector(overlaySelector);
  modal.classList.add('hide');
  overlay.classList.add('hide');
  document.body.style.overflow = '';
};

export const modal = function (
  modalSelector,
  overlaySelector,
  triggerSelector,
  modalTimer
) {
  const modal = document.querySelector(modalSelector);
  const overlay = document.querySelector(overlaySelector);

  function init() {
    hideModal(modalSelector, overlaySelector);
  }
  init();

  const btnsOpenModal = document.querySelectorAll(triggerSelector);
  modal.classList.add('hide');

  btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', function () {
      showModal(modalSelector, overlaySelector, modalTimer);
    });
  });

  document.addEventListener('click', function (e) {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      hideModal(modalSelector, overlaySelector);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hide')) {
      hideModal(modalSelector, overlaySelector);
    }
  });

  const showModalByScroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      showModal(modalSelector, overlaySelector, modalTimer);
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);
};
