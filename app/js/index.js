// Main


// TODO: Comments

// Imports
import 'babel-polyfill';

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
  each,
  isToggled,
  off,
  on,
  once,
  removeStyle,
  removeTabindex,
  resetTabindex,
  setImage,
  toggleElement,
} from './src/util';

const focusableElementsString = `
  .img__a,
  .main__button--icon
`;

let focusableElements;

let selectedLink;
let selectedImage;

let variations;

function check(link) {
  checkCriteria(link);

  if (hasMetCriteria()) {
    setDialogContent(2);
    toggleDialog(focusableElements);
  }
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

  debounce(() => elementToFocus.focus());

  debounce(
    () => check(selectedLink),
    1000
  );
}


function setSelectedImagePosition(top, left) {
  selectedImage.style.top = `${top}px`;
  selectedImage.style.left = `${left}px`;
}


function moveImageFromInitialPosition() {
  const selectedImagePosition = selectedImage.getBoundingClientRect();

  setSelectedImagePosition(
    selectedImagePosition.top,
    selectedImagePosition.left
  );
}


function setDetailedImage(event) {
  event.preventDefault();

  selectedLink = event.target;
  selectedImage = selectedLink.querySelector('.img');

  selectedLink.style.width = `${selectedImage.clientWidth}px`;
  selectedLink.style.height = `${selectedImage.clientHeight}px`;

  togglePreview();
  moveImageFromInitialPosition();
  toggleElement(selectedLink, 'active', getVariation());

  variations[getVariation()].start();
}


function closePreview() {
  removeStyle(selectedImage);
  variations[getVariation()].stop();
  togglePreview();

  debounce(
   () => once(selectedLink, 'click', setDetailedImage)
  );
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


function moveImageToInitialPosition() {
  const selectedLinkPosition = selectedLink.getBoundingClientRect();

  selectedImage.style.transform = 'translate(0, 0)';

  setSelectedImagePosition(
    selectedLinkPosition.top,
    selectedLinkPosition.left
  );

  once(selectedImage, 'transitionend', () => {
    selectedImage.style.transform = '';
  });
}


function t() {
  off(selectedImage, 'transitionend', t);
  moveImageToInitialPosition();

  once(selectedImage, 'transitionend', () => {
    toggleElement(selectedLink);
    removeStyle(selectedImage);
    removeStyle(selectedLink);
  });
}


function stopArcsVariation() {
  on(selectedImage, 'transitionend', t);
}


function scaleImage() {
  removeStyle(selectedImage);
  const scaleDimensions = calculateScaleDimensions();
  selectedImage.style.transform = `
    scale3d(${scaleDimensions}, ${scaleDimensions}, ${scaleDimensions}) translate3d(-50%, -50%, 0)
    `;
}


function startArcsVariation() {
  once(selectedImage, 'transitionend', scaleImage);

  debounce(() =>
    removeStyle(selectedImage)
  );
}


function stopSquashAndStretchVariation() {
  moveImageToInitialPosition();

  once(selectedImage, 'transitionend', () => {
    selectedLink.setAttribute('data-squash-and-stretch', '');

    once(selectedImage, 'transitionend', () => {
      debounce(() => {
        selectedLink.removeAttribute('data-squash-and-stretch');

        once(selectedImage, 'transitionend', () => {
          toggleElement(selectedLink, 'active', getVariation());
          removeStyle(selectedImage);
          removeStyle(selectedLink);
        });
      });
    });
  });
}


function stopSecondaryActionVariation() {
  moveImageToInitialPosition();

  once(selectedImage, 'transitionend', () => {
    toggleElement(selectedLink, 'active', getVariation());
    removeStyle(selectedImage);
  });
}


function stretchImage() {
  selectedLink.removeAttribute('data-squash-and-stretch');
  scaleImage();
}


function startSquashAndStretchVariation() {
  selectedLink.setAttribute('data-squash-and-stretch', '');
  once(selectedImage, 'transitionend', stretchImage);
}


function loadThumbnails() {
  each(app.querySelectorAll('.img'), imageToModify => {
    const image = imageToModify;

    setImage(
      image,
      image.getAttribute('data-thumbnail')
    );

    image.onload = () => image.removeAttribute('data-load');
  });
}


function init() {
  focusableElements = document.querySelectorAll(focusableElementsString);
  variations = [
    {
      start: scaleImage,
      stop: () => toggleElement(selectedLink),
    },
    {
      start: startArcsVariation,
      stop: stopArcsVariation,
    },
    {
      start: scaleImage,
      stop: stopSecondaryActionVariation,
    },
    {
      start: startSquashAndStretchVariation,
      stop: stopSquashAndStretchVariation,
    },
  ];

  initDialog(focusableElements);

  each(app.querySelectorAll('.img__a'), imageLink =>
    once(imageLink, 'click', setDetailedImage)
  );

  each(document.querySelectorAll('.img__button'),
    closeImagePreviewButton => on(closeImagePreviewButton, 'click', closePreview)
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
