var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var request = require('request');
var API_KEY = '277f33cdd3f688ef740c39f5a38df09f';

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