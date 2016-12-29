// Utilities
const numberofVariations = 4;

function delegateVariation(count) {
  return (count % numberofVariations);
}


module.exports = { delegateVariation };
