var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = process.env.MongoDB_URL;

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

router.get('/:id', (req, res) => {
  res.json({message: 'Message from /film/:id'});
});

module.exports = router;