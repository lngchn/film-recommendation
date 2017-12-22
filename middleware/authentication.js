const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { MongoClient } = require('mongodb');
const assert = require('assert');

const url = process.env.MongoDB_URL;

function findUser(db, email, callback) {
  const collection = db.collection('users');

  collection.find({ email }).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });
}

function checkPassword(submittedPassword, storedPassword) {
  return bcrypt.compare(submittedPassword, storedPassword);
}

// Call when user tries to log in
passport.use(new LocalStrategy(
  {
  // You can use email or username as usernameField (aka login as username or email)
    usernameField: 'email',
  },
  (email, password, done) => {
    MongoClient.connect(url, (err, db) => {
      findUser(db, email, (result) => {
        db.close();

        let user = null;

        if (result.length <= 0) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        user = result[0];

        checkPassword(password, user.password)
          .then((valid) => {
            if (!valid) {
              return done(null, false, { message: 'Incorrect email or password.' });
            }
            return done(null, user, { message: 'Successfully Logged In!' });
          });
      });
    });
  },
));

passport.serializeUser((user, done) => {
  // store user.email into session cookie (express-session)
  // it's not necessary to store other user info
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  // deserialize user.email and check if user exists in the database
  MongoClient.connect(url, (err, db) => {
    findUser(db, email, (result) => {
      db.close();

      let user = null;

      if (result.length <= 0) {
        return done(null, false);
      }

      user = result[0];

      return done(null, user);
    });
  });
});

module.exports = passport;
