// Utilities


// TODO: Comments


// Moves function to the end of the call stack
function debounce(func, timeout = 0) {
  setTimeout(func, timeout);
}


function isToggled(element, dataAttribute = 'active') {
  return element.hasAttribute(`data-${dataAttribute}`);
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


function removeTabindex(elements) {
  elements.forEach(element =>
    element.setAttribute('tabindex', -1)
  );
}


function removeStyle(element) {
  element.removeAttribute('style');
}


function resetTabindex(elements) {
  elements.forEach(element =>
    element.removeAttribute('tabindex')
  );
}


function toggle(elementToToggle) {
  const element = elementToToggle;
  element.hidden = !element.hidden;
}


function toggleElement(element, dataAttribute = 'active', attributeValue = '') {
  const attribute = `data-${dataAttribute}`;
  element.hasAttribute(attribute) ?
    element.removeAttribute(attribute) :
    element.setAttribute(attribute, attributeValue);
}


export {
  debounce,
  isToggled,
  off,
  on,
  once,
  removeStyle,
  removeTabindex,
  resetTabindex,
  toggle,
  toggleElement,
};
