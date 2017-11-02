const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve production build on Express server as static file
// You can check the project at localhost:3001 (Express server, not React server)
app.use(express.static(`${__dirname}/client/build`));

// Use the film router
// Usage example: localhost:3001/film
// In React, you can call fetch to /film
const film = require('./router/film');
const search = require('./router/search');
const user = require('./router/user');
app.use('/film', film);
app.use('/search', search);
app.use('/user', user);

app.get('/hello', (req, res) => {
  res.json({message: "Hello World"});
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is up on localhost:${PORT}`);
});