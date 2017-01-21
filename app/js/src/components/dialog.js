// Dialog

// Imports
import { app } from './app.js';

import {
  on,
  toggleElement,
  toggleHidden,
} from '../util.js';

const dialog = document.querySelector('.dialog');
let activeSection = dialog.querySelector('.dialog__section:not([hidden])');


function toggleDialog() {
  toggleHidden(dialog);
  toggleElement(app);
}


function init() {
  on(
    dialog.querySelector('.dialog__button--icon'),
    'click',
    toggleDialog
  );
}


function toggleDialogContent(id) {
  toggleHidden(activeSection);
  activeSection = dialog.querySelector(`[data-id="${id}"]`);
  toggleHidden(activeSection);
}


init();

export {
  dialog,
  toggleDialog,
  toggleDialogContent,
};
