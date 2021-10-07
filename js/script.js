'strict mode';
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
import { tabs } from './modules/tabs';
import { cards } from './modules/cards';
import { timer } from './modules/timer';
import { modal } from './modules/modal';
import { forms } from './modules/forms';
import { slider } from './modules/slider';
import { calculator } from './modules/calculator';
import { showModal } from './modules/modal';

const modalTimer = setTimeout(
  () => showModal('.modal', '.overlay', modalTimer),
  50000
);

// TABS
tabs(
  '.tabheader__item',
  '.tabcontent',
  '.tabheader__items',
  'tabheader__item_active'
);
// TIMER
timer('.timer', '2022-06-11');
// MODAL
modal('.modal', '.overlay', '[data-modal]', modalTimer);
// CARDS
cards();
// Forms
forms('form', modalTimer);
// SLIDER
slider({
  container: '.offer__slider',
  slide: '.offer__slide',
  nextArrow: '.offer__slider-next',
  prevArrow: '.offer__slider-prev',
  currentCounter: '#current',
  totalCounter: '#total',
  wrapper: '.offer__slider-wrapper',
  field: '.offer__slider-inner',
});
// Calculator
calculator();
