const express = require('express');

const router = express.Router();
const request = require('request');

const API_KEY = process.env.TMDB_KEY;

router.post('/', (req, res) => {
  const query = req.body.query;

  request({
    uri: 'https://api.themoviedb.org/3/search/movie',
    qs: {
      api_key: API_KEY,
      query,
    },
  }).pipe(res);
});

module.exports = router;
