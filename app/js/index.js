// Main

// TODO: Comments
let app;


// let detailedImage;


let dialog;
let imageLinks;
let imageList;


// let isImageToggled;


let selectedImage;
let selectedLink;
let variation;


function getElementPosition(element, relativeElement = app) {
  let trailElement = element;

  let top = 0;
  let left = 0;

  while (trailElement !== relativeElement) {
    top += trailElement.offsetTop;
    left += trailElement.offsetLeft;
    trailElement = trailElement.offsetParent;
  }

  return {
    top,
    left,
  };
}


function handleArcsTransition() {
  selectedLink.setAttribute('data-transition', '');
  selectedImage.style.top = 0;
  selectedImage.style.left = 0;
}


function scaleImage(event) {
  const imageToScale = event.target;

  const listWidth = imageList.clientWidth;
  const listHeight = imageList.clientHeight;
  const scaleTarget = ((listWidth <= listHeight) ? listWidth : listHeight);

  imageToScale.style.transform = `scale(${(scaleTarget / imageToScale.clientWidth)})`;

  // Removes event listener when finished
  imageToScale.removeEventListener('transitionend', scaleImage);
}


function handleArcs() {
  const imagePosition = getElementPosition(selectedImage, imageList);

  selectedLink.style.width = `${selectedImage.clientWidth}px`;
  selectedLink.style.height = `${selectedImage.clientHeight}px`;

  selectedImage.style.top = `${imagePosition.top}px`;
  selectedImage.style.left = `${imagePosition.left}px`;

  // Scales the image once transition is complete
  selectedImage.addEventListener('transitionend', scaleImage);

  setTimeout(handleArcsTransition, 0); // Debounces transition to the end of the call stack
}


/* function toggleImage() {
  if (isImageToggled) {
    app.removeAttribute('data-fixed');
    detailedImage.removeAttribute('data-active');
  } else {
    app.setAttribute('data-fixed', '');
    detailedImage.setAttribute('data-active', '');
  }

  isImageToggled = !isImageToggled;
} */


function setDetailedImage(event) {
  event.preventDefault();

  if (selectedImage && selectedLink) {
    selectedImage.removeAttribute('style');
    selectedLink.removeAttribute('data-transition');
  }

  selectedLink = event.target;
  selectedImage = selectedLink.querySelector('.images__img');

  switch (variation) {

    case 0:

      handleArcs();


      console.log('0');


      break;

    case 1:


      console.log('1');


      break;


    case 2:


      console.log('2');


      break;

    case 3:


      console.log('3');


      break;

    default:


      console.log('default');


      break;
  }


  /* detailedImage.setAttribute(
    'alt',
    imageToToggle.getAttribute('alt')
  );

  detailedImage.setAttribute(
    'src',
    imageToToggle.getAttribute('src')
  );

  toggleImage(); */


}


function toggleDialog() {
  dialog[
    (dialog.open ? 'close' : 'show')
  ]();
}


function init() {
  app = document.querySelector('[data-app]');

  // Parses the variation value as an integer
  variation = parseInt(
    app.getAttribute('data-variation'), 10
  );


  // detailedImage = app.querySelector('.img');


  dialog = app.querySelector('.dialog');
  imageList = app.querySelector('.ul--images');
  imageLinks = app.querySelectorAll('.images__a');


  // detailedImage.addEventListener('click', toggleImage);


  imageLinks.forEach(imageLink =>
    imageLink.addEventListener('click', setDetailedImage)
  );
}

document.addEventListener('DOMContentLoaded', init);
