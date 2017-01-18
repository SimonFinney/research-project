// Main


// TODO: Comments


import {
  debounce,
  off,
  on,
  once,
  removeStyle,
  toggleElement,
} from './src/util';

let app;
let dialog;

let imageLinks;

let selectedImage;
let selectedLink;

let variation;

const variationFunctions = {
  0: handleControlVariation,
  1: handleArcsVariation,
  2: handleSecondaryActionVariation,
  3: handleSquashAndStretchVariation,
};


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


function closePreview() {

  if (variation === 0) {
    toggleElement(selectedLink);

    on(selectedLink, 'click', setDetailedImage);
  }


  removeStyle(selectedImage);
  on(selectedImage, 'transitionend', t);

  togglePreview();
  resetTabindex();
}


function scaleImage(callback) {
  const imageList = app.querySelector('.ul--images');
  const imageListWidth = imageList.clientWidth;
  const imageListHeight = imageList.clientHeight;

  const scaleTarget = ((imageListWidth <= imageListHeight) ?
    imageListWidth :
    imageListHeight);

  selectedImage.style.transform = `
    scale(${(scaleTarget / selectedImage.clientWidth)}) translate(-50%, -50%)
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
}


function handleControlVariation() {
  toggleElement(selectedLink);
  scaleImage();
  togglePreview();
}


function setSelectedImagePosition(top, left) {
  selectedImage.style.top = `${top}px`;
  selectedImage.style.left = `${left}px`;
}


function handleArcsVariation() {
  const selectedImagePosition = selectedImage.getBoundingClientRect();
  toggleElement(selectedLink);

  setSelectedImagePosition(
    selectedImagePosition.top,
    selectedImagePosition.left
  );

  // Scales the image once transition is complete
  once(selectedImage, 'transitionend', delegateImageToScale);

  debounce(() =>
    removeStyle(selectedImage)
  );
}


function handleSecondaryActionVariation() {
  console.log('handleSecondaryActionVariation');
}


function handleSquashAndStretchVariation() {
  console.log('handleVariation');
}


function loadThumbnails() {


  // off(dialog, 'close', loadThumbnails); // TODO: Debug


  app.querySelectorAll('.img')
    .forEach(image =>
      setImage(
        image,
        image.getAttribute('data-thumbnail')
      )
    );
}


function resetTabindex() {
  imageLinks.forEach(imageLink => imageLink.removeAttribute('tabindex'));
}


function preventFocus(selectedLink) {
  imageLinks.forEach(imageLink => imageLink.setAttribute('tabindex', -1));
}


function setSelectedItems(selectedLink) {
  selectedImage = selectedLink.querySelector('.img');
}


function setDetailedImage(event) {
  event.preventDefault();
  selectedLink = event.target;

  setSelectedItems(selectedLink);
  preventFocus(selectedLink);

  selectedLink.style.width = `${selectedImage.clientWidth}px`;
  selectedLink.style.height = `${selectedImage.clientHeight}px`;

  variationFunctions[variation]();
}


function init() {
  app = document.querySelector('[data-app]');


  // Parses the variation value as an integer
  variation = parseInt(
    app.getAttribute('data-variation'), 10
  );


  dialog = app.querySelector('.dialog');


  // on(dialog, 'close', loadThumbnails); // TODO: Debug


  loadThumbnails(); // TODO: Debug

  imageLinks = app.querySelectorAll('.img__a');

  imageLinks.forEach(imageLink =>
    once(imageLink, 'click', setDetailedImage)
  );

  document.querySelectorAll('.img__button')
    .forEach(closeImagePreviewButton => on(closeImagePreviewButton, 'click', closePreview)
  );
}


function toggleDialog() {
  dialog[
    (dialog.open ? 'close' : 'show')
  ]();
}

on(document, 'DOMContentLoaded', init);
