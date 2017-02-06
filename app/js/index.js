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

const variations = [
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


function moveImageToInitialPosition() {
  const selectedLinkPosition = selectedLink.getBoundingClientRect();

  selectedImage.style.transform = 'translate(0, 0)';

  setSelectedImagePosition(
    selectedLinkPosition.top,
    selectedLinkPosition.left
  );

  once(selectedImage, 'transitionend', () => selectedImage.style.transform = '');
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


function startArcsVariation() {

  // Scales the image once transition is complete
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

function scaleImage() {
  removeStyle(selectedImage);
  const scaleDimensions = calculateScaleDimensions();
  selectedImage.style.transform = `
    scale3d(${scaleDimensions}, ${scaleDimensions}, ${scaleDimensions}) translate3d(-50%, -50%, 0)
    `;
}


function stretchImage() {
  selectedLink.removeAttribute('data-squash-and-stretch');
  scaleImage();
}

function moveImageFromInitialPosition() {
  const selectedImagePosition = selectedImage.getBoundingClientRect();

  setSelectedImagePosition(
    selectedImagePosition.top,
    selectedImagePosition.left
  );
}


function startSquashAndStretchVariation() {
  selectedLink.setAttribute('data-squash-and-stretch', '');
  once(selectedImage, 'transitionend', stretchImage);
}


function loadThumbnails() {
  each(app.querySelectorAll('.img'), image => {
    setImage(
      image,
      image.getAttribute('data-thumbnail')
    );

    image.onload = () => image.removeAttribute('data-load');
  });
}


function setDetailedImage(event) {
  event.preventDefault();

  selectedLink = event.target;
  selectedImage = selectedLink.querySelector('.img')

  selectedLink.style.width = `${selectedImage.clientWidth}px`;
  selectedLink.style.height = `${selectedImage.clientHeight}px`;

  togglePreview();
  moveImageFromInitialPosition();
  toggleElement(selectedLink, 'active', getVariation());

  variations[getVariation()].start();
}


function init() {
  focusableElements = document.querySelectorAll(focusableElementsString);
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
