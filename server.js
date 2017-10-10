const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const url = 'mongodb://localhost:27017/filmpro';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to MongoDB server");
  db.close();
});

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