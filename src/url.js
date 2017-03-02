// URL

// TODO: Comments
const shortid = require('shortid');

const database = require('./database');

const template = '* ${generated}\n';

function generate(count, host) {
  let text = '';
  for (let url = 0; url < count; url++) {
    const generatedUrl = shortid.generate();

    const generated = `${host}${generatedUrl}`;
    text += eval('`' + template + '`');

    database.createUrl(generatedUrl);
  }

  return text;
}

module.exports = { generate };
