// URL

const shortid = require('shortid');

const database = require('./database');

const totalUrlsToGenerate = 10;


function generate() {
  const generatedUrls = [];
  for (let urlToGenerate = 0; urlToGenerate < totalUrlsToGenerate; urlToGenerate++) {
    database.createUrl(
      shortid.generate()
    );
  }

  return generatedUrls;
}


generate();
