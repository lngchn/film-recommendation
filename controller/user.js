const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 12;

const passport = require('../middleware/authentication');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const MongoDB_URL = require('../mongodb-url.js');
const url = MongoDB_URL.url;

function findUser(db, username, email, callback) {
  const collection = db.collection('users');
  collection.find({
    $or: [{'username': username}, {'email': email}]
  }).toArray((err, docs) => {
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

router.get('/register', passport.redirectIfLoggedIn('/welcome'), (req, res) => {
  // This should be part of React, check if user is logged in
  res.redirect('/')
});

router.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;

  MongoClient.connect(url, (err, db) => {
    findUser(db, username, email, (result) => {
      db.close();
      if(result.length > 0) {
        res.send('Username or email is already taken');
      }
      else {
        let newUser = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          seedFilms: [],
          recommendation: []
        }

        bcrypt.hash(newUser.password, saltRounds)
        .then(hashedPassword => {
          newUser.password = hashedPassword;

          MongoClient.connect(url, (err, db) => {
            createUser(db, newUser, (result) => {
              db.close();
              let user = result[0];
              req.login(user, () => {
                res.redirect('/welcome');
              })
            });
          });
        });
      }
    });
  });
});

router.get('/login', passport.redirectIfLoggedIn('/welcome'), (req, res) => {
  // This should be part of React, check if user is logged in
  res.redirect('/')
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/welcome')
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/')
})

// Only allow access to logged in users
// passport.redirectIfNotLoggedIn can be used at application level 
// by using router.use() at the top of the file.
router.get('/profile', passport.redirectIfNotLoggedIn('/'), (req, res) => {
  res.redirect('/welcome');
});

module.exports = router;
