const express = require('express');

const router = express.Router();

const axios = require('axios');

const API_KEY = process.env.TMDB_KEY;

router.get('/:id', (req, res) => {
  const id = req.params.id;

  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,keywords,videos`)
    .then(result => res.json(result.data))
    .catch((error) => {
      res.json(error).sendStatus(400);
    });
});

module.exports = router;
