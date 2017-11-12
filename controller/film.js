var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
<<<<<<< HEAD
const MongoDB_URL = require('../mongodb-url.js');
const url = MongoDB_URL.url;
var request = require('request');

const tmdb_api = "https://api.themoviedb.org/3/movie/";
const tmdb_api_key = "?api_key=";
const API_KEY = TMDB_KEY.key;

router.get('/', (req, res) => {
});

router.get('/movie_id/:id', (req, res) => {
  request.get(tmdb_api+req.params.id+tmdb_api_key+API_KEY, (error, response, body) => {
    res.json(body);
  });
});

module.exports = router;



//**************************Sample code**********************************
/*
=======
const url = process.env.MongoDB_URL;
>>>>>>> e2363a81da5bdbdbbdd2dd800024f4c8cafe5f56

function insertFilms(db, callback) {
  // Get the films collection
  var collection = db.collection('films');
  // Insert some films
  collection.insertMany([
    {film_id: 1},
    {film_id: 2},
    {film_id: 3}
  ], (err, result) => {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 films into the collection");
    callback(result);
  });
}

function findFilms(db, callback) {
  // Get the films collection
  var collection = db.collection('films');
  // Find all films
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });
}

router.post('/', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    insertFilms(db, () => {
      db.close();
    });
  });

  res.sendStatus(200);  // 'OK' status
});

router.get('/', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    findFilms(db, (result) => {
      db.close();
      res.json(result);
    });
  });
});