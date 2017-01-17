// Main


// TODO: Comments


import {
  debounce,
  off,
  on,
} from './src/util';

let app;

let dialog;

let imageLinks;

let selectedImageClosePreviewButton;
let selectedImage;
let selectedLink;
let selectedImagePosition;

let selectedLinkPosition;

let variation;


function removeStyle(element) {
  element.removeAttribute('style');
}


function t3() {
  selectedLink.removeAttribute('data-transition');

  off(selectedImage, 'transitionend', t3);

  removeStyle(selectedImage);
  removeStyle(selectedLink);

  off(window, 'resize', scaleImage);
}


function t2() {
  selectedImage.style.transform = 'translate(0, 0)';
  selectedImage.style.top = selectedLinkPosition.top + 'px';
  selectedImage.style.left = selectedLinkPosition.left + 'px';

  on(selectedImage, 'transitionend', t3);
}


function t(event) {

  if (event.propertyName === 'transform') {

    setImage(selectedImage, 'thumbnail');

    selectedLinkPosition = selectedLink.getBoundingClientRect();
    on(selectedLink, 'click', setDetailedImage);


    t2();
    off(selectedImage, 'transitionend', t);
  }
}


function closePreview() {
  toggleClosePreviewButton();
  selectedImage.removeAttribute('data-fixed');

  if (variation === 0) {

    on(selectedLink, 'click', setDetailedImage);
  }


  removeStyle(selectedImage);
  on(selectedImage, 'transitionend', t);

  toggleFixedBody();
  resetTabindex();
}


function togglePreview() {
  off(selectedImage, 'transitionend', togglePreview);
  toggleClosePreviewButton();
}


function scaleImage() {
  const imageList = app.querySelector('.ul--images');
  const imageListWidth = imageList.clientWidth;
  const imageListHeight = imageList.clientHeight;

  const scaleTarget = ((imageListWidth <= imageListHeight) ?
    imageListWidth :
    imageListHeight);

  selectedImage.style.transform = `
    scale(${(scaleTarget / selectedImage.clientWidth)}) translate(-50%, -50%)
  `;

  on(selectedImage, 'transitionend', togglePreview);
}


function setImage(image, dataAttribute) {
  image.setAttribute(
    'src',
    image.getAttribute(`data-${dataAttribute}`)
  );
}


function delegateImageToScale() {

  setImage(selectedImage, 'src');

  scaleImage();

  // Removes event listener when transition is finished
  off(selectedImage, 'transitionend', delegateImageToScale);

  toggleFixedBody();

  on(window, 'resize', scaleImage);
}


function handleTransition() {
  selectedLink.setAttribute('data-transition', '');
  removeStyle(selectedImage);
}


function handleControlVariation() {
  fixLinkDimensions();
  selectedImage.setAttribute('data-fixed', '');
  scaleImage();
  setImage(selectedImage, 'src');
  toggleFixedBody();
  togglePreview();
}


function toggleClosePreviewButton() {
  const isPreviewToggled = selectedImageClosePreviewButton.hasAttribute('data-active');
  isPreviewToggled ?
    selectedImageClosePreviewButton.removeAttribute('data-active') :
    selectedImageClosePreviewButton.setAttribute('data-active', '');

  (isPreviewToggled ? off : on)
    (selectedImageClosePreviewButton, 'click', closePreview);
}


function fixLinkDimensions() {
  selectedLink.style.width = `${selectedImage.clientWidth}px`;
  selectedLink.style.height = `${selectedImage.clientHeight}px`;
}


function handleArcsVariation() {
  selectedImagePosition = selectedImage.getBoundingClientRect();

  fixLinkDimensions();

  selectedImage.style.top = `${selectedImagePosition.top}px`;
  selectedImage.style.left = `${selectedImagePosition.left}px`;

  // Scales the image once transition is complete
  on(selectedImage, 'transitionend', delegateImageToScale);

  debounce(handleTransition);
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
      setImage(image, 'thumbnail')
    );
}


function toggleFixedBody() {
  app.hasAttribute('data-fixed') ?
    app.removeAttribute('data-fixed') :
    app.setAttribute('data-fixed', '');
}


function resetTabindex() {
  imageLinks.forEach(imageLink => imageLink.removeAttribute('tabindex'));
}


function preventFocus(selectedLink) {
  imageLinks.forEach(imageLink => imageLink.setAttribute('tabindex', -1));
}


function setDetailedImage(event) {
  event.preventDefault();

  selectedLink = event.target;

  off(selectedLink, 'click', setDetailedImage);

  selectedImage = selectedLink.querySelector('.img');
  selectedImageClosePreviewButton = selectedLink.querySelector('.img__button');


  // Parses the variation value as an integer
  /* const variation = parseInt(
    document.querySelector('.html')
      .getAttribute('data-variation'), 10
  ); */


  variation = 1; // Debug

  preventFocus(selectedLink);

  const variations = {
    0: handleControlVariation,
    1: handleArcsVariation,
    2: handleSecondaryActionVariation,
    3: handleSquashAndStretchVariation,
  };

  variations[variation]();
}


function init() {
  app = document.querySelector('[data-app]');

  dialog = app.querySelector('.dialog');


  // on(dialog, 'close', loadThumbnails); // TODO: Debug


  loadThumbnails(); // TODO: Debug

  imageLinks = app.querySelectorAll('.img__a');


  imageLinks.forEach(imageLink =>
    on(imageLink, 'click', setDetailedImage)
  );
}


function toggleDialog() {
  dialog[
    (dialog.open ? 'close' : 'show')
  ]();
}

on(document, 'DOMContentLoaded', init);
