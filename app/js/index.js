// Main

// TODO: Comments
let app;

let dialog;
let imageToScale;

let selectedImage;
let selectedLink;


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
}


function delegateImageToScale(event) {
  imageToScale = event.target;

  selectedImage.setAttribute(
    'src',
    selectedImage.getAttribute('data-src')
  );

  scaleImage();

  // Removes event listener when transition is finished
  imageToScale.removeEventListener('transitionend', delegateImageToScale);

  window.addEventListener('resize', scaleImage);
}


function handleTransition() {
  selectedLink.setAttribute('data-transition', '');
  selectedImage.removeAttribute('style');
}


function handleArcs() {
  const selectedImagePosition = selectedImage.getBoundingClientRect();

  selectedLink.style.width = `${selectedImage.clientWidth}px`;
  selectedLink.style.height = `${selectedImage.clientHeight}px`;

  selectedImage.style.top = `${selectedImagePosition.top}px`;
  selectedImage.style.left = `${selectedImagePosition.left}px`;

  // Scales the image once transition is complete
  selectedImage.addEventListener('transitionend', delegateImageToScale);

  setTimeout(handleTransition, 0); // Debounces transition to the end of the call stack
}


function loadThumbnails() {
  dialog.removeEventListener('close', loadThumbnails);

  app.querySelectorAll('.images__img')
    .forEach(image =>
      image.setAttribute(
        'src',
        image.getAttribute('data-thumbnail')
      )
    );
}


function setDetailedImage(event) {
  event.preventDefault();

  if (selectedImage && selectedLink) {
    selectedImage.removeAttribute('style');
    selectedLink.removeAttribute('data-transition');
  }

  selectedLink = event.target;
  selectedImage = selectedLink.querySelector('.images__img');

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
  dialog.addEventListener('close', loadThumbnails);

  app.querySelectorAll('.images__a')
    .forEach(imageLink =>
      imageLink.addEventListener('click', setDetailedImage)
    );
}


function toggleDialog() {
  dialog[
    (dialog.open ? 'close' : 'show')
  ]();
}

document.addEventListener('DOMContentLoaded', init);
