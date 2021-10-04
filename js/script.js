'strict mode';

// TABS
const tabs = document.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');
const tabsParent = document.querySelector('.tabheader__items');

const hideTabContent = function () {
  tabsContent.forEach(item => {
    item.classList.add('hide');
    item.classList.remove('show', 'fade');
  });

  tabs.forEach(tab => tab.classList.remove('tabheader__item_active'));
};

const showTabContent = function (i = 0) {
  tabsContent[i].classList.add('show', 'fade');
  tabsContent[i].classList.remove('hide');
  tabs[i].classList.add('tabheader__item_active');
};

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', function (e) {
  const target = e.target;
  if (target && target.classList.contains('tabheader__item')) {
    tabs.forEach((el, i) => {
      if (target == el) {
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});

// TIMER

const deadline = '2021-10-05';
const getTimeRemaining = function (endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const seconds = Math.floor((t / 1000) % 60);

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

function getZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

const setClock = function (selector, endtime) {
  const timer = document.querySelector(selector);
  const days = timer.querySelector('#days');
  const hours = timer.querySelector('#hours');
  const minutes = timer.querySelector('#minutes');
  const seconds = timer.querySelector('#seconds');
  const timeInterval = setInterval(updateClock, 1000);

  updateClock();

  function updateClock() {
    const t = getTimeRemaining(endtime);
    // days.innerHTML = String(Math.trunc(t.days)).padStart(2, 0);
    // hours.innerHTML = String(Math.trunc(t.hours)).padStart(2, 0);
    days.innerHTML = getZero(t.days);
    hours.innerHTML = getZero(t.hours);
    minutes.innerHTML = getZero(t.minutes);
    seconds.innerHTML = getZero(t.seconds);
    if (t.t <= 0) {
      clearInterval(timeInterval);
    }
  }
};

setClock('.timer', deadline);

// MODAL

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalClose = document.querySelector('.modal__close');
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

// const showModal = function () {
//   modal.classList.add('show');
//   modal.classList.remove('hide');
//   document.body.style.overflow = 'hidden';
// };

// const hideModal = function () {
//   modal.classList.remove('show');
//   modal.classList.add('hide');
//   document.body.style.overflow = '';
// };

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', function () {
    showModal();
  });
});

modalClose.addEventListener('click', function () {
  hideModal();
});

document.addEventListener('click', function (e) {
  if (e.target === modal) {
    hideModal();
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hide')) {
    hideModal();
  }
});

// const modalTimer = setTimeout(showModal, 50000000);

const showModalByScroll = function () {
  if (
    window.pageYOffset + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    showModal();

    window.removeEventListener('scroll', showModalByScroll);
  }
};

window.addEventListener('scroll', showModalByScroll);

// if ((window.scrollY = 5000)) {
//   showModal();
// }

// console.log(btnClose[0]);
// btnWhite.addEventListener('click', function () {
//   modal.style.display = 'block';
// });

// btnDark.addEventListener('click', function () {
//   modal.style.display = 'block';
// });

// for (let i = 0; i < btnsOpenModal.length; i++) {
//   btnsOpenModal[i].addEventListener('click', function () {
//     showModal();
//   });
// }

// Classes for cards
class MenuCard {
  constructor(src, alt, title, desc, price, parentSelector) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.desc = desc;
    this.price = price;
    this.parentSelector = document.querySelector(parentSelector);
    this.transfer = 27;
    this.changeToUAH();
  }

  changeToUAH() {
    return +(this.price *= this.transfer);
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
        <div class="menu__item">
          <img src=${this.src} alt=${this.alt}/>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">
            ${this.desc}
          </div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
        </div>`;

    this.parentSelector.append(element);
  }
}

new MenuCard(
  'img/tabs/vegy.jpg',
  'vegy',
  'Меню "Фитнес"',
  `Меню "Фитнес" - это новый подход к приготовлению блюд: больше
    свежих овощей и фруктов. Продукт активных и здоровых людей. Это
    абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
  9,
  '.menu .container'
).render();

new MenuCard(
  'img/tabs/elite.jpg',
  'elite',
  'Меню “Премиум”',
  `В меню “Премиум” мы используем не только красивый дизайн упаковки,
  но и качественное исполнение блюд. Красная рыба, морепродукты,
  фрукты - ресторанное меню без похода в ресторан!`,
  14,
  '.menu .container'
).render();

new MenuCard(
  'img/tabs/post.jpg',
  'post',
  'Меню "Постное"',
  `Меню “Постное” - это тщательный подбор ингредиентов: полное
  отсутствие продуктов животного происхождения, молоко из миндаля,
  овса, кокоса или гречки, правильное количество белков за счет тофу
  и импортных вегетарианских стейков.`,
  21,
  '.menu .container'
).render();

// const div = new MenuCard();
// div.render();
