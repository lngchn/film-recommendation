const express = require('express');
const app = express();
var mongojs = require('mongojs')
var userdb = mongojs('userdb')
var usercollection = userdb.collection('usercollection')

// Serve production build on Express server as static file
// You can check the project at localhost:3001 (Express server, not React server)
app.use(express.static(`${__dirname}/client/build`));

app.get('/hello', (req, res) => {
  res.json({message: "Hello World"});
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is up on localhost:${PORT}`);
});