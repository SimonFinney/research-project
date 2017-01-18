// Utilities


// TODO: Comments


// Moves function to the end of the call stack
function debounce(func) {
  setTimeout(func, 0);
}


function toggleEventListener(element, eventListenerToggle, eventType, func) {
  element[`${eventListenerToggle}EventListener`](eventType, func);
}


function off(element, eventType, func) {
  toggleEventListener(element, 'remove', eventType, func);
}


function on(element, eventType, func) {
  toggleEventListener(element, 'add', eventType, func);
}


function once(element, eventType, functionToCall) {
  const eventListenerFunction = (event) => {
    off(element, eventType, eventListenerFunction);
    functionToCall(event);
  };

  on(element, eventType, eventListenerFunction);
}


function removeStyle(element) {
  element.removeAttribute('style');
}


function toggleElement(element) {
  element.hasAttribute('data-active') ?
    element.removeAttribute('data-active') :
    element.setAttribute('data-active', '');
}


export {
  debounce,
  off,
  on,
  once,
  removeStyle,
  toggleElement,
};
