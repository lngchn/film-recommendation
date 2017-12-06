const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 12;

const passport = require('../middleware/authentication');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = process.env.MongoDB_URL;

const axios = require('axios');
const API_KEY = process.env.TMDB_KEY;

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
          let ratedFilms = user.ratedFilms;
          let seedFilms = user.seedFilms;
          let recommendation = user.recommendation;
          res.status(200).json({ratedFilms, seedFilms, recommendation});
        }
      });
    });
  }
});


function addRatedFilm(db, email, ratedFilm, callback) {
  const collection = db.collection('users');

  collection.findOne({email: email}, (err, user) => {
    let ratedFilms = user.ratedFilms.find(film => {
      return film.id === ratedFilm.id && film.imdb_id === ratedFilm.imdb_id;
    });

    // If the film already exists in the rated film, we don't add it.
    // This essentailly prevent the users from updating their rating.
    // If changing rating is allowed, a different logic is required here.
    if(!ratedFilms) {
      collection.updateOne({email: email}, { $addToSet: {ratedFilms: ratedFilm} }, (err, result) => {
          assert.equal(err, null);
          callback(result);
      });
    } else {
      callback(null);
    }
  });
}

function deleteRatedFilm(db, email, ratedFilm, callback) {
  const collection = db.collection('users');

  collection.findOne({email: email}, (err, user) => {
    let ratedFilms = user.ratedFilms.find(film => {
      return film.id === ratedFilm.id && film.imdb_id === ratedFilm.imdb_id; 
    });

    if(ratedFilms) {
      ratedFilm.rating = ratedFilms.rating;
      ratedFilm.title = ratedFilms.title;
      ratedFilm.poster_path = ratedFilms.poster_path;

      collection.update({email: email}, { $pull: {ratedFilms: ratedFilm} }, (err, result) => {
          assert.equal(err, null);
          callback(result);
      });
    } else {
      callback(null);
    }
  });
}

router.post('/user/ratedfilm', (req, res) => {
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
          let id = parseInt(req.body.id);
          let imdb_id = req.body.imdb_id;
          let rating = parseInt(req.body.rating);
          let title = req.body.title;
          let poster_path = req.body.poster_path;

          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then(res => {
              imdb_id = res.data.imdb_id;
              const ratedFilm = { id: id, imdb_id: imdb_id, rating: rating, title: title, poster_path: poster_path };
              MongoClient.connect(url, (err, db) => {
                addRatedFilm(db, email, ratedFilm, (user) => {
                  db.close();
                });
              });
            })
            .catch(error => {
              console.log(error);
            })

          res.sendStatus(200);
        }
      });
    });
  }
});

router.delete('/user/ratedfilm', (req, res) => {
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
        const id = parseInt(req.body.id);
        const imdb_id = req.body.imdb_id;
        const ratedFilm = { id: id, imdb_id: imdb_id };

        MongoClient.connect(url, (err, db) => {
          deleteRatedFilm(db, email, ratedFilm, (user) => {
            db.close();
            res.sendStatus(200);
          });
        });
      }
    });
  });
});

function addSeedFilm(db, email, seedFilm, callback) {
  const collection = db.collection('users');

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
          const id = parseInt(req.body.id);
          let imdb_id = null;
          let title = null;
          let poster_path = null;
          let seedFilm = { id, imdb_id, title, poster_path };

          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then(result => {
              imdb_id = result.data.imdb_id;
              title = result.data.title;
              poster_path = result.data.poster_path;

              seedFilm = { id, imdb_id, title, poster_path };
            })
            .then(() => {
              if(req.user.seedFilms.find(film => film.id === id) === undefined) {
                MongoClient.connect(url, (err, db) => {
                  addSeedFilm(db, email, seedFilm, (result) => {
                    db.close();
                    res.sendStatus(200);
                  });
                });
              }
            })
            .catch(error => {
              console.log(error.message);
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

        let seedFilm = req.user.seedFilms.find((film) => {
          return film.id === id;
        })

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

module.exports = router;
