// Main


// TODO: Comments


import {
  debounce,
  off,
  on,
} from './src/util';

let app;

let dialog;

let selectedImageClosePreviewButton;
let selectedImage;
let selectedLink;
let selectedImagePosition;

let selectedLinkPosition;


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

    on(selectedLink, 'click', setDetailedImage);

    selectedLinkPosition = selectedLink.getBoundingClientRect();


    t2();
    off(selectedImage, 'transitionend', t);
  }
}


function closePreview() {
  off(selectedImageClosePreviewButton, 'click', closePreview);
  selectedImageClosePreviewButton.removeAttribute('data-active');


  removeStyle(selectedImage);
  on(selectedImage, 'transitionend', t);

  toggleFixedBody();
}


function displayClosePreviewButton() {
  off(selectedImage, 'transitionend', displayClosePreviewButton);

  selectedImageClosePreviewButton.setAttribute('data-active', '');

  on(selectedImageClosePreviewButton, 'click', closePreview);
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

  on(selectedImage, 'transitionend', displayClosePreviewButton);
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

  on(window, 'resize', scaleImage);
}


function handleTransition() {
  selectedLink.setAttribute('data-transition', '');
  removeStyle(selectedImage);
}


function handleArcs() {
  selectedImagePosition = selectedImage.getBoundingClientRect();

  selectedLink.style.width = `${selectedImage.clientWidth}px`;
  selectedLink.style.height = `${selectedImage.clientHeight}px`;

  selectedImage.style.top = `${selectedImagePosition.top}px`;
  selectedImage.style.left = `${selectedImagePosition.left}px`;

  // Scales the image once transition is complete
  on(selectedImage, 'transitionend', delegateImageToScale);

  debounce(handleTransition);
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


function setDetailedImage(event) {
  event.preventDefault();

  toggleFixedBody();

  selectedLink = event.target;

  off(selectedLink, 'click', setDetailedImage);

  selectedImage = selectedLink.querySelector('.img');
  selectedImageClosePreviewButton = selectedLink.querySelector('.img__button');

  // Parses the variation value as an integer
  const variation = parseInt(
    app.getAttribute('data-variation'), 10
  );

  switch (variation) {

    case 0:

      handleArcs();

      break;

    case 1:

      break;

    case 2:

      break;

    case 3:

      break;

    default:

      break;
  }
}


function init() {
  app = document.querySelector('[data-app]');

  dialog = app.querySelector('.dialog');


  // on(dialog, 'close', loadThumbnails); // TODO: Debug


  loadThumbnails(); // TODO: Debug


  app.querySelectorAll('.img__a')
    .forEach(imageLink =>
      on(imageLink, 'click', setDetailedImage)
    );
}


function toggleDialog() {
  dialog[
    (dialog.open ? 'close' : 'show')
  ]();
}

on(document, 'DOMContentLoaded', init);
