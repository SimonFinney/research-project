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


export {
  debounce,
  off,
  on,
};
