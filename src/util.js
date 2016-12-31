// Utilities
const numberofVariations = 4;

function getConfiguration(configurationVariable) {
  return (
    process.env[configurationVariable] || require('../USER-DEFINED.json')[configurationVariable]
  );
}


function delegateVariation(count) {
  return (count % numberofVariations);
}


module.exports = {
  delegateVariation,
  getConfiguration,
};
