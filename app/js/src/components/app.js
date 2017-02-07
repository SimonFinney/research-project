// App

const app = document.querySelector('[data-app]');
let criteriaCount = 0;
const criteriaTotal = app.querySelectorAll('[data-criteria]')
  .length;


function getCriteriaCount() {
  return criteriaCount;
}


function getCriteriaTotal() {
  return criteriaTotal;
}


function getVariation() {
  return parseInt(
    app.getAttribute('data-variation'), 10
  );
}


function checkCriteria(element) {
  criteriaCount = (
    element.hasAttribute('data-criteria') ?
      (criteriaCount + 1) :
      criteriaCount
  );

  element.removeAttribute('data-criteria');
}


function hasMetCriteria() {
  return (getCriteriaCount() >= getCriteriaTotal());
}


export {
  app,
  checkCriteria,
  getVariation,
  hasMetCriteria,
};
