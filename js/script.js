'strict mode';
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
tabs();
// TIMER
timer();
// MODAL
modal('.modal', '.overlay', '[data-modal]', modalTimer);
// CARDS
cards();
// Forms
forms(modalTimer);
// SLIDER
slider();
// Calculator
calculator();
