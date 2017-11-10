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
            ratedFilms: [],
            seedFilms: [],
            recommendation: [],
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


////////////////////////////////////////////////
// API for adding rated films and seed films  //
////////////////////////////////////////////////

function addSeedFilm(db, email, seedFilm, callback) {
  const collection = db.collection('users');

  // $addToSet prevents duplicate
  collection.updateOne({email: email}, { $addToSet: {seedFilms: seedFilm} }, (err, result) => {
      assert.equal(err, null);
      callback(result);
  });
}

function deleteSeedFilm(db, email, seedFilm, callback) {
  const collection = db.collection('users');

  collection.update({email: email}, { $pull: {seedFilms: seedFilm} }, (err, result) => {
      assert.equal(err, null);
      callback(result);
  });
}

router.get('/user/films', (req, res) => {
  if(!req.user) {
    res.sendStatus(401);
  } else {
    const username = req.user.username;
    const email = req.user.email;

    MongoClient.connect(url, (err, db) => {
      findUser(db, username, email, (result) => {
        db.close();
        if(result.length === 0) {
          res.sendStatus(400);  // Need to return message saying that user is not found.
        }
        else {
          let user = result[0];
          let seedFilms = user.seedFilms;
          let recommendation = user.recommendation;
          res.status(200).json({seedFilms, recommendation});
        }
      });
    });
  }
});

router.post('/user/seedfilm', (req, res) => {
  if(!req.user) {
    res.sendStatus(401);
  } else {
    const username = req.user.username;
    const email = req.user.email;

    MongoClient.connect(url, (err, db) => {
      findUser(db, username, email, (result) => {
        db.close();
        if(result.length === 0) {
          res.sendStatus(400);  // Need to return message saying that user is not found.
        }
        else {
          const id = req.body.id;
          const imdb_id = req.body.imdb_id;
          const title = req.body.title;
          const poster_path = req.body.poster_path;
          const seedFilm = { id: id, imdb_id: imdb_id, title: title, poster_path: poster_path };

          MongoClient.connect(url, (err, db) => {
            addSeedFilm(db, email, seedFilm, (user) => {
              db.close();
              res.sendStatus(200);
            });
          });
        }
      });
    });
  }
});

router.delete('/user/seedfilm', (req, res) => {
  if(!req.user) {
    res.sendStatus(401);
  }

  const username = req.user.username;
  const email = req.user.email;

  MongoClient.connect(url, (err, db) => {
    findUser(db, username, email, (result) => {
      db.close();
      if(result.length === 0) {
        res.sendStatus(400);  // Need to return message saying that user is not found.
      }
      else {
        const id = req.body.id;
        const imdb_id = req.body.imdb_id;
        const seedFilm = { id: id, imdb_id: imdb_id };

        MongoClient.connect(url, (err, db) => {
          deleteSeedFilm(db, email, seedFilm, (user) => {
            db.close();
            res.sendStatus(200);
          });
        });
      }
    });
  });
});

function addRatedFilm() {

}

router.post('/user/ratedfilm', (req, res) => {  

});

module.exports = router;
