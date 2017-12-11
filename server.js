const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const controllers = require('./controller');
const expressSession = require('express-session');
const passport = require('./middleware/authentication');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.enable('trust proxy');   // for use with express-rate-limit

app.use(expressSession(({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true
})));
app.use(passport.initialize());
app.use(passport.session());

// Serve production build on Express server as static file
// You can check the project at localhost:3001 (Express server, not React server)
app.use(express.static(`${__dirname}/client/build`));

app.use(controllers);

app.get('/welcome', (req, res) => {
  res.json({message: "Welcome, you have logged in"});
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is up on localhost:${PORT}`);
});