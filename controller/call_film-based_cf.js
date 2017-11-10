/*
	This script will call the seed film-based collaborative filtering Python script.
	It will also output a JSON file which contains a list of films to be used as seed films. 
*/
const express = require('express');
const router = express.Router();
const passport = require('../middleware/authentication');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const MongoDB_URL = require('../mongodb-url.js');
const url = MongoDB_URL.url;

var user_id;
var output =  { "films": [],"user_id": user_id };


router.get('/', (req, res) => {

	const user = req.user;
		
	if(!user){
  		console.log("user is N/A");
  		return;	
	}
 		
 	for (var i = 0; i < seedFilms.length; i++){
 		let x = seedFilms[i];
 		output["films"].push({"id": x.id, "imdb_id": x.imdb_id});
 		
    	console.log(output);
 	}
 	ouput["user_id"] = user._id.$oid;
 	exportSeedFilmFile(output);
 		
});


function exportSeedFilmFile(output){
	const fs = require('fs');
	const content = JSON.stringify(output, null, 4);

	fs.writeFile( ouput.user_id + "_seed_films.json", content, 'utf8', function (err) {
    	if (err)
        	return console.log(err);
  		console.log(ouput.user_id + " seed films saved.");
      	
	}); 
  	callPyScript(ouput.user_id);
}


function callPyScript(user_id){

	console.log("Call seed film-based collaborative filtering python script.");
	/*var spawn = require('child_process').spawn,   
	py    = spawn('python', ['get_recs.py']),
   	data = [s];     

	py.stdout.on('end', function(){
  		console.log('Output:',data[0]);
	});

	py.stdin.write(JSON.stringify(data));
	py.stdin.end();*/

}

module.exports = router;
