// Main


// TODO: Comments


import {
  debounce,
  off,
  on,
} from './src/util';

let app;

let dialog;

let imageToScale;

let selectedClosePreviewButton;
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

    console.log(event.propertyName);

    selectedImage.setAttribute(
      'src',
      selectedImage.getAttribute('data-thumbnail')
    );

    on(selectedLink, 'click', setDetailedImage);

    selectedLinkPosition = selectedLink.getBoundingClientRect();


    debounce(t2);
    off(imageToScale, 'transitionend', t);
  }
}


function closePreview() {
  off(selectedClosePreviewButton, 'click', closePreview);
  selectedClosePreviewButton.removeAttribute('data-active');


  removeStyle(imageToScale);
  on(imageToScale, 'transitionend', t);

  app.removeAttribute('data-fixed');
}


function displayClosePreviewButton() {
  off(imageToScale, 'transitionend', displayClosePreviewButton);

  selectedClosePreviewButton.setAttribute('data-active', '');

  on(selectedClosePreviewButton, 'click', closePreview);
}


function scaleImage() {
  const imageList = app.querySelector('.ul--images');
  const imageListWidth = imageList.clientWidth;
  const imageListHeight = imageList.clientHeight;

  const scaleTarget = ((imageListWidth <= imageListHeight) ?
    imageListWidth :
    imageListHeight);

  imageToScale.style.transform = `
    scale(${(scaleTarget / imageToScale.clientWidth)}) translate(-50%, -50%)
  `;

  on(imageToScale, 'transitionend', displayClosePreviewButton);
}


function delegateImageToScale(event) {
  imageToScale = event.target;

  selectedImage.setAttribute(
    'src',
    selectedImage.getAttribute('data-src')
  );

  scaleImage();

  // Removes event listener when transition is finished
  off(imageToScale, 'transitionend', delegateImageToScale);

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
      image.setAttribute(
        'src',
        image.getAttribute('data-thumbnail')
      )
    );
}


function resetSelectedImage() {
  if (selectedImage && selectedLink) {
    selectedLink.removeAttribute('data-transition');
    removeStyle(selectedImage);
  }
}


function setDetailedImage(event) {
  event.preventDefault();

  resetSelectedImage();

  app.setAttribute('data-fixed', '');

  selectedLink = event.target;

  off(selectedLink, 'click', setDetailedImage);

  selectedImage = selectedLink.querySelector('.img');
  selectedClosePreviewButton = selectedLink.querySelector('.img__button');

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
