// Main


// TODO: Comments

// Imports
import {
  app,
  checkCriteria,
  getVariation,
  hasMetCriteria,
} from './src/components/app';

import {
  dialog,
  initDialog,
  setDialogContent,
  toggleDialog,
} from './src/components/dialog';

import {
  debounce,
  isToggled,
  off,
  on,
  once,
  removeStyle,
  removeTabindex,
  resetTabindex,
  toggleElement,
} from './src/util';

const focusableElementsString = `
  .img__a,
  .main__button--icon
`;

let focusableElements;

let selectedLink;
let selectedImage;

const variations = [
  {
    start: handleControlVariation,
    stop: () => {
      toggleElement(selectedLink);

      debounce(
       () => once(selectedLink, 'click', setDetailedImage)
      );
    },
  },
  {
    start: handleArcsVariation,
    stop: () => on(selectedImage, 'transitionend', t),
  },
  { start: handleSecondaryActionVariation },
  { start: handleSquashAndStretchVariation },
];


function t3() {
  toggleElement(selectedLink);
  removeStyle(selectedImage);
  removeStyle(selectedLink);
}


function t2() {
  const selectedLinkPosition = selectedLink.getBoundingClientRect();
  selectedImage.style.transform = 'translate(0, 0)';

  setSelectedImagePosition(
    selectedLinkPosition.top,
    selectedLinkPosition.left
  );

  once(selectedImage, 'transitionend', t3);
}


function t(event) {

  if (event.propertyName === 'transform') {
    once(selectedLink, 'click', setDetailedImage);
    t2();
    off(selectedImage, 'transitionend', t);
  }
}


function check(selectedLink) {
  checkCriteria(selectedLink);

  if (hasMetCriteria()) {
    setDialogContent(2);
    toggleDialog(focusableElements);
  }
}


function closePreview() {
  removeStyle(selectedImage);
  variations[getVariation()].stop();
  togglePreview();
}


function calculateScaleDimensions() {
  const imageList = app.querySelector('.ul--images');
  const imageListWidth = imageList.clientWidth;
  const imageListHeight = imageList.clientHeight;

  const scaleTarget = ((imageListWidth <= imageListHeight) ?
    imageListWidth :
    imageListHeight);

  return (scaleTarget / selectedImage.clientWidth);
}


function scaleImage(callback) {
  const imageList = app.querySelector('.ul--images');
  const imageListWidth = imageList.clientWidth;
  const imageListHeight = imageList.clientHeight;

  const scaleTarget = ((imageListWidth <= imageListHeight) ?
    imageListWidth :
    imageListHeight);

  selectedImage.style.transform = `
    scale(${calculateScaleDimensions()}) translate(-50%, -50%)
  `;

  if (callback) {
    callback();
  }
}


function setImage(image, src) {
  image.setAttribute('src', src);
}


function delegateImageToScale() {
  scaleImage(
    once(selectedImage, 'transitionend', togglePreview)
  );
}


function togglePreview() {
  const src =
    (selectedImage.getAttribute('src') === selectedImage.getAttribute('data-src')) ?
    selectedImage.getAttribute('data-thumbnail') :
    selectedImage.getAttribute('data-src');

  setImage(selectedImage, src);
  toggleElement(app);

  isToggled(app) ?
    removeTabindex(focusableElements) :
    resetTabindex(focusableElements);

  const elementToFocus = isToggled(app) ?
    selectedLink.querySelector('.img__button') :
    selectedLink;

  elementToFocus.focus();

  debounce(
    () => check(selectedLink),
    500
  );
}


function handleControlVariation() {
  toggleElement(selectedLink, 'active', getVariation());
  scaleImage();
  togglePreview();
}


function setSelectedImagePosition(top, left) {
  selectedImage.style.top = `${top}px`;
  selectedImage.style.left = `${left}px`;
}


function handleArcsVariation() {
  fixImagePosition();

  // Scales the image once transition is complete
  once(selectedImage, 'transitionend', delegateImageToScale);

  debounce(() =>
    removeStyle(selectedImage)
  );
}


function handleSecondaryActionVariation() {
  togglePreview();
  fixImagePosition();
  selectedImage.style.top = '75%';
  selectedImage.style.left = '75%';
  selectedImage.style.transformOrigin = 'bottom';
  selectedImage.style.transform = `
    scale(${calculateScaleDimensions()}) translate(-75%, -75%)
  `;
}


function stretchImage() {
  togglePreview();
  selectedImage.style.top = '50%';
  selectedImage.style.left = '50%';
  selectedImage.style.transformOrigin = 'top left';
  selectedImage.style.transform = `
    scale(${calculateScaleDimensions()}) translate(-50%, -50%)
  `;
}

function fixImagePosition() {
  const selectedImagePosition = selectedImage.getBoundingClientRect();

  setSelectedImagePosition(
    selectedImagePosition.top,
    selectedImagePosition.left
  );

  toggleElement(selectedLink, 'active', getVariation());
}


function handleSquashAndStretchVariation() {
  fixImagePosition();
  once(selectedImage, 'transitionend', stretchImage);
}


function loadThumbnails() {
  app.querySelectorAll('.img')
    .forEach(image =>
      setImage(
        image,
        image.getAttribute('data-thumbnail')
      )
    );
}


function setSelectedItems() {
  selectedImage = selectedLink.querySelector('.img');
}


function setDetailedImage(event) {
  console.log('setDetailedImage');
  event.preventDefault();
  selectedLink = event.target;

  setSelectedItems(selectedLink);

  selectedLink.style.width = `${selectedImage.clientWidth}px`;
  selectedLink.style.height = `${selectedImage.clientHeight}px`;

  variations[getVariation()].start();
}


function init() {
  focusableElements = document.querySelectorAll(focusableElementsString);
  initDialog(focusableElements);


  app.querySelectorAll('.img__a')
    .forEach(imageLink =>
      once(imageLink, 'click', setDetailedImage)
  );

  document.querySelectorAll('.img__button')
    .forEach(closeImagePreviewButton => on(closeImagePreviewButton, 'click', closePreview)
  );

  on(
    document.querySelector('.main__button--icon'),
    'click',
    () => toggleDialog(focusableElements)
  );

  once(dialog, 'submit', event => {
    event.preventDefault();
    setDialogContent(1);
    loadThumbnails();
  });
}

on(document, 'DOMContentLoaded', init);

export { app };
