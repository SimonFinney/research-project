// TODO: Comments

const express = require('express');
const imgur = require('./imgur');

const database = require('./database');
const name = require('../package.json').name;
const util = require('./util');

const router = express.Router();


router.get('/', (request, response) => {
  if (!request.session.key) {
    database.create({ id: request.session.id }, databaseEntry => {
      database.count(count => request.session.variation = util.delegateVariation(count));

      request.session.key = databaseEntry.key;
      setTimeout(() => database.check(request.session.key), request.session.cookie.maxAge);
    });
  }

  request.session.data ?

    response.redirect('/success') :

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
});


router.get('/data', (request, response) =>
  database.get(data =>
    response.send(data)
  )
);


router.get('/success', (request, response) =>
  response.render('views/success.nunjucks', { session: request.session.data })
);


router.post('/submit', (request, response) => {
  const data = {
    datetime: util.getDatetime(),
    ip: util.getIpAddress(request),
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
