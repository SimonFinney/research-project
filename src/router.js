// TODO: Comments

const express = require('express');
const imgur = require('./imgur');

const database = require('./database');
const manifest = require('../package.json');
const util = require('./util');

const router = express.Router();


router.get('/', (request, response) =>
  database.count(count => {
    const variation = util.delegateVariation(count);

    imgur.get('album/Glnla', album =>
      response.render('views/index.nunjucks', {
        images: album.data.images,
        isDebug: util.isDebug(),
        manifest,
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
  data.datetime = (+ new Date); // Adds a timestamp to the data being saved

  database.create(data, postResponse =>
    response.send(postResponse)
  );
});


module.exports = { router };
