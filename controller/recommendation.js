const express = require('express');
const router = express.Router();
const passport = require('../middleware/authentication');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = process.env.MongoDB_URL;

const API_KEY = process.env.TMDB_KEY;

const axios = require('axios');

const PythonShell = require('python-shell');

function saveRecommendation(db, email, recommendation, callback) {
  const collection = db.collection('users');

  collection.update({email: email}, { $set: {recommendation: recommendation} }, (err, result) => {
      assert.equal(err, null);
      callback(result);
  });
}

function doneFetchingMovies(email, recommendation, res) {
  MongoClient.connect(url, (err, db) => {
    saveRecommendation(db, email, recommendation, (result) => {
      db.close();
      res.sendStatus(200);
    });
  });
}

function callPyScript(dataToPython, req, res) {
  let options = {
    scriptPath: `${__dirname}/../python-script`
  }
  let pyshell = new PythonShell('collabuserFINAL.py', options);
  let recommendation_imdb_id = null;
  let recommendation = [];

  // Send data to Python script
  pyshell.send(JSON.stringify(dataToPython));

  // After receiving data from Python script
  pyshell.on('message', function(result) {
    recommendation_imdb_id = JSON.parse(JSON.stringify(result));
    recommendation_imdb_id = recommendation_imdb_id.split(' ');
    recommendation_imdb_id.pop();   // remove the last empty array item
  });

  pyshell.end(function(err) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      let numOfFilmsToSave = recommendation_imdb_id.length;
      for (let i = 0; i < numOfFilmsToSave; i++) {
        (function (i) {
          setTimeout(function () {
            let id = null;
            let imdb_id = recommendation_imdb_id[i];
            let rating = null;
            let title = null;
            let poster_path = null; 

            axios.get(`https://api.themoviedb.org/3/movie/${imdb_id}?api_key=${API_KEY}`)
              .then(result => {
                id = result.data.id;
                rating = null;
                title = result.data.title;
                poster_path = result.data.poster_path;

                let film = { id: id, imdb_id: imdb_id, rating: rating, title: title, poster_path: poster_path };
                recommendation.push(film);

                // Wait for for loop to finish to have all the films in the recommendation array
                if(i === numOfFilmsToSave - 1) {
                  let email = req.user.email;
                  doneFetchingMovies(email, recommendation, res);
                }
              })
              .catch(error => {
                console.log(error.message);
              });
          }, 400 * i);    // Set 400 ms delay per TMDB API call, average limit is 4/1sec
        })(i);
      }   
    }
  });
}

router.get('/', (req, res) => {
  const user = req.user;

  if(!user){
    res.sendStatus(401);
  }

  const seedFilms = user.seedFilms;
  let dataToPython =  { films: [], user_id: user._id };
  
  for(let i in seedFilms) {
    let film = seedFilms[i];
    dataToPython["films"].push({ "id": film.id, "imdb_id": film.imdb_id, "rating": film.rating, "title": film.title});
  }

  callPyScript(dataToPython, req, res);
});

module.exports = router;
