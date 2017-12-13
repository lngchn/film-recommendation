const express = require('express');
const router = express.Router();
const passport = require('../middleware/authentication');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = process.env.MongoDB_URL;

const API_KEY = process.env.TMDB_KEY;

const axios = require('axios');

const RateLimit = require('express-rate-limit');
const apiLimiter = new RateLimit({
  windowMs: 2*60*1000,      // in milliseconds
  max: 1,                   // num of request within windowsMs timer
  skipFailedRequests: true, 
});

const PythonShell = require('python-shell');

function saveRecommendation(db, email, itemBasedRecommendation, callback) {
  const collection = db.collection('users');

  collection.update({email: email}, { $set: {itemBasedRecommendation: itemBasedRecommendation} }, (err, result) => {
      assert.equal(err, null);
      callback(result);
  });
}

function doneFetchingMovies(email, itemBasedRecommendation, res) {
  MongoClient.connect(url, (err, db) => {
    saveRecommendation(db, email, itemBasedRecommendation, (result) => {
      db.close();
      res.sendStatus(200);
    });
  });
}

function callPyScript(dataToPython, req, res) {
  let options = {
    scriptPath: `${__dirname}/../python-script`
  }
  let pyshell = new PythonShell('collabitemFINAL.py', options);
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
            let title = null;
            let poster_path = null;
            let genres = null; 
            let release_date = null;
            let runtime = null;
            let vote_average = null;

            axios.get(`https://api.themoviedb.org/3/movie/${imdb_id}?api_key=${API_KEY}`)
              .then(result => {
                id = result.data.id;
                title = result.data.title;
                poster_path = result.data.poster_path;
                genres = result.data.genres;
                release_date = result.data.release_date;
                runtime = result.data.runtime;
                vote_average = result.data.vote_average;

                let film = { id: id, imdb_id: imdb_id,
                             title: title, poster_path: poster_path, genres: genres, 
                             release_date: release_date, runtime: runtime, vote_average: vote_average };
                             
                recommendation.push(film);
              })
              .catch(error => {
                console.log(error.message);
              });

              // Wait for for loop to finish to have all the films in the recommendation array
              if(i === numOfFilmsToSave - 1) {
                let email = req.user.email;
                doneFetchingMovies(email, recommendation, res);
              }

          }, 350 * i);  // average limit is 4/1sec
        })(i);
      }   
    }
  });
}

router.get('/itembased', apiLimiter, (req, res) => {
  const user = req.user;

  if(!user){
    res.sendStatus(401);
  }

  const seedFilms = user.seedFilms;
  
  if(seedFilms.length > 0) {
    let dataToPython =  { films: [], user_id: user._id };
    
    for(let i in seedFilms) {
      let film = seedFilms[i];
      dataToPython["films"].push({ "id": film.id, "imdb_id": film.imdb_id, "title": film.title });
    }

    callPyScript(dataToPython, req, res);
  }
});

module.exports = router;
