//11-12-17, 9:24 pm
const express = require('express');
const router = express.Router();
const passport = require('../middleware/authentication');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = process.env.MongoDB_URL;

/* Uncomment to export an actual JSON file.
function exportSeedFilmFile(output, res){
  const fs = require('fs');
  const content = JSON.stringify(output, null, 4);

  fs.writeFile(output.user_id + "_seed_films.json", content, 'utf8', function (err) {
    if (err) {
      res.sendStatus(500);
    }
  }); 
  callPyScript(content, res);
}*/

function createJSON_Obj(output, res){
  const content = JSON.stringify(output, null, 4);
  callPyScript(content, res);
}


function callPyScript(data, res) {
  //Currently linked to a test Python script, will eventually link to our collabrative filtering script.
  var spawn = require('child_process').spawn, py = spawn('python', ['../python-script/receive_json_obj.py']), dataString = '';

  //Uncomment to use a non-server side array.
  //var recommendationa = []; 
  var user = res.user;
  var recommendations = user.recommendation;

  py.stdout.on('data', function(data){
      dataString = data.toString();
  });

  // Add elements to the recommendation array
  py.stdout.on('end', function(){
    //recommendations.push(dataString);
    recommendations.push(JSON.parse(JSON.stringify(dataString)));

    for(var i =0; i < recommendations.length; i++){
      res.json({message: recommendations[i]}); 
    }
  });

  py.stdin.write(JSON.stringify(data));
  py.stdin.end();
 
  // Send back 200 status when done.
  res.sendStatus(200);
}


// Init
router.get('/', (req, res) => {
  const user = req.user;

  if(!user){
    res.sendStatus(401);
  }
  let output =  { films: [], user_id: user._id };
  const seedFilms = user.seedFilms;

  // Uncomment to test with non-dynamic data.
  //let output =  { films: [], user_id: "5a024f9b60375008f87cfe07" };
  //const seedFilms = [{"id":297762,"imdb_id":"tt0451279","title":"Wonder Woman","poster_path":"/imekS7f1OuHyUP2LAiTEM0zBzUz.jpg"},{"id":346364,"imdb_id":"tt1396484","title":"It","poster_path":"/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg"},{"id":13640,"imdb_id":"tt0934706","title":"Superman: Doomsday","poster_path":"/3of4nShmv1hBmrebOQqGlfZ9ZL0.jpg"},{"id":1726,"imdb_id":"tt0371746","title":"Iron Man","poster_path":"/848chlIWVT41VtAAgyh9bWymAYb.jpg"},{"id":272,"imdb_id":"tt0372784","title":"Batman Begins","poster_path":"/dr6x4GyyegBWtinPBzipY02J2lV.jpg"},{"id":34127,"imdb_id":"tt0038260","title":"Wonder Man","poster_path":"/uvvdbVmk04jNFH0Zl3qsgAIsAXa.jpg"},{"id":315635,"imdb_id":"tt2250912","title":"Spider-Man: Homecoming","poster_path":"/kY2c7wKgOfQjvbqe7yVzLTYkxJO.jpg"},{"id":588,"imdb_id":"tt0384537","title":"Silent Hill","poster_path":"/4Zz9cF8S4E7DITosNYh3spybYJb.jpg"},{"id":1576,"imdb_id":"tt0120804","title":"Resident Evil","poster_path":"/5jdvEi57WBGuI5n2drG8FLAbYDp.jpg"},{"id":293660,"imdb_id":"tt1431045","title":"Deadpool","poster_path":"/inVq3FRqcYIRl2la8iZikYYxFNR.jpg"}];
  
  for(let i in seedFilms) {
    let film = seedFilms[i];
    output["films"].push({ "id": film.id, "imdb_id": film.imdb_id, "rating": film.rating, "tile": film.title});
  }

  //exportSeedFilmFile(output, res);
  createJSON_Obj(output, res);
});

module.exports = router;
