// URL

const fs = require('fs');
const shortid = require('shortid');

const database = require('./database');

const filename = 'URLs.md';
const templatedString = '* ${generatedUrl}\n';

const totalUrlsToGenerate = 10;


function generate() {
  for (let urlToGenerate = 0; urlToGenerate < totalUrlsToGenerate; urlToGenerate++) {
    const generatedUrl = shortid.generate();
    const generatedUrlString = eval('`' + templatedString + '`');
    database.createUrl(generatedUrl, () =>
      !fs.existsSync(filename) ?
        fs.writeFileSync(filename, generatedUrlString, 'utf-8') :
        fs.appendFileSync(filename, generatedUrlString, 'utf-8')
    );
  }
}


generate();
