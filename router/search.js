var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var request = require('request');

const getTMDBKey = require('../tmdb-api-key');
const API_KEY = getTMDBKey.findKey();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  let query = req.body.query;

  let result = new Promise((resolve, reject) => {
    resolve(getTMDBKey.findKey());
  });

  result.then(result => {
    let key = result.key;
    request({
      uri: 'https://api.themoviedb.org/3/search/movie',
      qs: {
        api_key: key,
        query: query
      }
    }).pipe(res);
  });
});

module.exports = router;