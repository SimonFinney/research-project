// TODO: Comments

const express = require('express');
const fs = require('fs');

const database = require('./database');
const imgur = require('./imgur');
const name = require('../package.json').name;
const url = require('./url');
const util = require('./util');

const router = express.Router();
const root = '/u/';


function render(request, response) {
  imgur.get('album/Glnla', album =>
    response.render('views/index.nunjucks', {
      images: util.shuffle(album.data.images),
      imgurThumbnailExtension: util.getConfiguration('imgurThumbnailExtension'),
      imgurThumbnailSize: util.getConfiguration('imgurThumbnailSize'),
      imgurUrlPrefix: util.getConfiguration('imgurUrlPrefix'),
      isDebug: util.isDebug(),
      name,
      variation: request.session.variation,
    })
  );
}


function createSession(request, response) {
  database.count(count => {
    request.session.variation = util.delegateVariation(count);

    database.create({ id: request.session.id }, databaseEntry => {
      request.session.key = databaseEntry.key;
      render(request, response);
      setTimeout(() => database.check(request.session.key), request.session.cookie.maxAge);
    });
  });
}


function isSessionUrl(request) {
  return request.session.url;
}


function determineRoute(request, response) {
  (isSessionUrl(request) && !request.session.key) ?
    createSession(request, response) :
    (isSessionUrl(request) && !request.session.data) ?
      render(request, response) :
      response.redirect('/success');
}


router.get(`${root}:url`, (request, response) => {
  const url = request.params.url;

  !isSessionUrl(request) ?
    database.checkUrl(url, isValidUrl => {
      if (isValidUrl) {
        request.session.url = url;
      }

      determineRoute(request, response);
    }) :
    determineRoute(request, response);
});


router.get('/data', (request, response) =>
  database.get(data =>
    response.send(data)
  )
);


router.get('/generate/:count', (request, response) => {
  const host = `${request.headers.host}${root}`;
  response.header('Content-Disposition', 'attachment; filename="URLS.md"');
  response.send(
    url.generate(request.params.count, host)
  );
});


router.get('/success', (request, response) =>
  response.render('views/success.nunjucks', { session: request.session.data })
);


router.post('/submit', (request, response) => {
  const data = {
    datetime: util.getDatetime(),
    ip: util.getIpAddress(request),
    variation: request.session.variation,
  };

  Object.keys(request.body)
    .forEach(objectProperty => {
      data[objectProperty] = request.body[objectProperty];
    }
  );

  database.update(request.session.key, data, () => {
    request.session.data = data;
    response.redirect('/success');
  });
});


module.exports = { router };
