var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const MongoDB_URL = require('../mongodb-url.js');
const url = MongoDB_URL.url;

function findUser(db, username, callback) {
  const collection = db.collection('users');
  // Only the documents which match 'username': username should be returned
  collection.find({'username': username}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });
}

function createUser(db, newUser, callback) {
  const collection = db.collection('users');

  collection.insertMany([
    newUser
  ], (err, result) => {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    callback(result);
  });
}

router.get('/:username', (req, res) => {
  const username = req.params.username;

  MongoClient.connect(url, (err, db) => {
    findUser(db, username, (result) => {
      db.close();
      res.json(result);
    });
  });
});

router.post('/', (req, res) => {
  let newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    seedFilms: []
  }
  MongoClient.connect(url, (err, db) => {
    createUser(db, newUser, () => {
      db.close();
      res.sendStatus(200);
    });
  });
});

module.exports = router;