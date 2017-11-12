var express = require('express');
var router = express.Router();
var request = require('request');

const API_KEY = process.env.TMDB_KEY;

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