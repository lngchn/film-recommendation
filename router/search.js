var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var request = require('request');

const TMDB_KEY = require('../tmdb-api-key');
const API_KEY = TMDB_KEY.key;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  let query = req.body.query;

  request({
    uri: 'https://api.themoviedb.org/3/search/movie',
    qs: {
      api_key: API_KEY,
      query: query
    }
  }).pipe(res);

});

module.exports = router;