/*
	This script will call the seed film-based collaborative filtering Python script.
	It will also output a JSON file which contains a list of films to be used as seed films. 
*/
const express = require('express');
const router = express.Router();

const passport = require('../middleware/authentication');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = process.env.MongoDB_URL;

function exportSeedFilmFile(output, res){
  const fs = require('fs');
  const content = JSON.stringify(output, null, 4);

  fs.writeFile(output.user_id + "_seed_films.json", content, 'utf8', function (err) {
    if (err) {
      res.sendStatus(500);
    }
  }); 
  callPyScript(output.user_id, res);
}

function callPyScript(user_id, res) {
  console.log("Call seed film-based collaborative filtering python script.");
  /*var spawn = require('child_process').spawn,   
  py    = spawn('python', ['get_recs.py']),
    data = [s];     

  py.stdout.on('end', function(){
      console.log('Output:',data[0]);
  });

  py.stdin.write(JSON.stringify(data));
  py.stdin.end();*/


  // Send back 200 status when done
  res.sendStatus(200);
}

router.get('/', (req, res) => {
	const user = req.user;


	if(!user){
    res.sendStatus(401);
	}

  let output =  { films: [], user_id: user._id };
  const seedFilms = user.seedFilms;
 		
 	for(let i in seedFilms) {
 		let film = seedFilms[i];
 		output["films"].push({ "id": film.id, "imdb_id": film.imdb_id });
 	}

 	exportSeedFilmFile(output, res);
});

module.exports = router;
