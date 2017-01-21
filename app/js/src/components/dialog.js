// Dialog

// Imports
import { app } from './app.js';

import {
  on,
  toggle,
  toggleElement,
} from '../util.js';

const dialog = document.querySelector('.dialog');
let activeSection = dialog.querySelector('.dialog__section:not([hidden])');


function toggleDialog() {
  toggle(dialog);
  toggleElement(app);
}


function init() {
  on(
    dialog.querySelector('.dialog__button--icon'),
    'click',
    toggleDialog
  );
}


function setDialogContent(id) {
  toggle(activeSection);
  activeSection = dialog.querySelector(`[data-id="${id}"]`);
  toggle(activeSection);
}


init();

export {
  dialog,
  setDialogContent,
  toggleDialog,
};
