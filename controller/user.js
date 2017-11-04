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

function isValidUserInfo(username, email, password, confirmPassword) {
  // Need a better validation check. Perhaps a validator package?
  if(password !== confirmPassword || password.length === 0 || 
     username.length === 0 || email.length === 0) {
    return false;
  }
  return true;
}

router.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if(!isValidUserInfo(username, email, password, confirmPassword)) {
    // Need to return sensible message for front-end to consume as to
    // why registration fails.
    res.sendStatus(400) // Bad Request
  } else {
    MongoClient.connect(url, (err, db) => {
      findUser(db, username, email, (result) => {
        db.close();
        if(result.length > 0) {
          // Need to return message saying that username or email is already taken.
          res.sendStatus(400);
        }
        else {
          let newUser = {
            username: username,
            email: email,
            password: password,
            seedFilms: [],
            recommendation: []
          }

          bcrypt.hash(newUser.password, saltRounds)
          .then(hashedPassword => {
            newUser.password = hashedPassword;

            MongoClient.connect(url, (err, db) => {
              createUser(db, newUser, (user) => {
                db.close();
                req.login(newUser, () => {
                  res.sendStatus(200);
                })
              });
            });
          });
        }
      });
    });
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
})

router.get('/auth', (req, res) => {
  // If user is logged in, then req.user returns the user object
  if(req.user) {
    res.sendStatus(200);
  }
  else {
    res.sendStatus(401);
  }
}); 

module.exports = router;
