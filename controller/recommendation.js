const express = require('express');
const router = express.Router();
const passport = require('../middleware/authentication');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = process.env.MongoDB_URL;

const PythonShell = require('python-shell');

function callPyScript(dataToPython, res) {
  let pyshell = new PythonShell(`${__dirname}/../python-script/receive_json_obj.py`);
  let recommendation = [];

  // Send data to Python script
  pyshell.send(JSON.stringify(dataToPython));

  // After receiving data from Python script
  pyshell.on('message', function(result) {
    recommendation = JSON.parse(JSON.stringify(result));
    console.log(recommendation);
  });

  pyshell.end(function(err) {
    if(err) throw err;
  });

  res.sendStatus(200);  
}

router.get('/', (req, res) => {
  const user = req.user;

  if(!user){
    res.sendStatus(401);
  }

  const seedFilms = user.seedFilms;
  let dataToPython =  { films: [], user_id: user._id };
  
  for(let i in seedFilms) {
    let film = seedFilms[i];
    dataToPython["films"].push({ "id": film.id, "imdb_id": film.imdb_id, "rating": film.rating, "tile": film.title});
  }

  callPyScript(dataToPython, res);
});

module.exports = router;
