// Main

// TODO: Comments
let app;
let detailedImage;
let dialog;
let imageLinks;
let isImageToggled;


function toggleImage() {
  if (isImageToggled) {
    app.removeAttribute('data-fixed');
    detailedImage.removeAttribute('data-active');
  } else {
    app.setAttribute('data-fixed', '');
    detailedImage.setAttribute('data-active', '');
  }

  isImageToggled = !isImageToggled;
}


function setDetailedImage(event) {
  event.preventDefault();

  const imageToToggle = event.target;

  detailedImage.setAttribute(
    'alt',
    imageToToggle.getAttribute('alt')
  );

  detailedImage.setAttribute(
    'src',
    imageToToggle.getAttribute('src')
  );

  toggleImage();
}


function toggleDialog() {
  dialog[
    (dialog.open ? 'close' : 'show')
  ]();
}


function init() {
  app = document.querySelector('[data-app]');
  detailedImage = app.querySelector('.img');
  dialog = app.querySelector('.dialog');
  imageLinks = app.querySelectorAll('.images__a');

  detailedImage.addEventListener('click', toggleImage);

  imageLinks.forEach(imageLink =>
    imageLink.addEventListener('click', setDetailedImage)
  );
}

document.addEventListener('DOMContentLoaded', init);
