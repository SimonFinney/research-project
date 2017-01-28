// TODO: Comments

const express = require('express');
const imgur = require('./imgur');

const database = require('./database');
const name = require('../package.json').name;
const util = require('./util');

const router = express.Router();


router.get('/', (request, response) =>
  database.count(count => {
    const variation = util.delegateVariation(count);

    imgur.get('album/Glnla', album =>
      response.render('views/index.nunjucks', {
        images: util.shuffle(album.data.images),
        imgurThumbnailExtension: util.getConfiguration('imgurThumbnailExtension'),
        imgurThumbnailSize: util.getConfiguration('imgurThumbnailSize'),
        imgurUrlPrefix: util.getConfiguration('imgurUrlPrefix'),
        isDebug: util.isDebug(),
        name,
        variation,
      })
    );
  })
);


router.get('/data', (request, response) =>
  database.get(data =>
    response.send(data)
  )
);


router.post('/submit', (request, response) => {
  const data = request.body;

  data.id = util.getId(request);
  data.datetime = util.getDatetime(); // Adds a timestamp to the data being saved

  database.create(data, postResponse =>
    response.send(postResponse)
  );
});


module.exports = { router };
