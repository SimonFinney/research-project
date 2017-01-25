// Dialog

// Imports
import { app } from './app.js';

import {
  isToggled,
  on,
  removeTabindex,
  resetTabindex,
  toggle,
  toggleElement,
} from '../util';

const dialog = document.querySelector('.dialog');
let activeSection = dialog.querySelector('.dialog__section:not([hidden])');


function toggleDialog(elementsToFocus) {
  toggle(dialog);
  toggleElement(app, 'dialog');

  isToggled(dialog) ?
    removeTabindex(elementsToFocus) :
    resetTabindex(elementsToFocus);
}


function initDialog(elementsToFocus) {
  on(
    dialog.querySelector('.dialog__button--icon'),
    'click',
    () => toggleDialog(elementsToFocus)
  );
}


function setDialogContent(id) {
  toggle(activeSection);
  activeSection = dialog.querySelector(`[data-id="${id}"]`);
  toggle(activeSection);
}


export {
  dialog,
  initDialog,
  setDialogContent,
  toggleDialog,
};
