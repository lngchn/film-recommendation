//11-12-17, 9:42 pm
/*
 This is a test script for sending a JSON object to a Python script. It will send data to the Python script 
 'receive_json_obj.py'. For testing purposes, this script utilizes a non-dynamically generated JSON object. 
 The code here will be incorporated into 'recommendation.js', where it will then use dynamic data. This script 
 has been placed in the 'python-script' directory for convenience. It will not be utilized in the final product.
*/

// Utilizes a non-dynamic object for testing purposes
var obj = {"films":[{"id":297762,"imdb_id":"tt0451279","title":"Wonder Woman","poster_path":"/imekS7f1OuHyUP2LAiTEM0zBzUz.jpg"},{"id":346364,"imdb_id":"tt1396484","title":"It","poster_path":"/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg"},{"id":13640,"imdb_id":"tt0934706","title":"Superman: Doomsday","poster_path":"/3of4nShmv1hBmrebOQqGlfZ9ZL0.jpg"},{"id":1726,"imdb_id":"tt0371746","title":"Iron Man","poster_path":"/848chlIWVT41VtAAgyh9bWymAYb.jpg"},{"id":272,"imdb_id":"tt0372784","title":"Batman Begins","poster_path":"/dr6x4GyyegBWtinPBzipY02J2lV.jpg"},{"id":34127,"imdb_id":"tt0038260","title":"Wonder Man","poster_path":"/uvvdbVmk04jNFH0Zl3qsgAIsAXa.jpg"},{"id":315635,"imdb_id":"tt2250912","title":"Spider-Man: Homecoming","poster_path":"/kY2c7wKgOfQjvbqe7yVzLTYkxJO.jpg"},{"id":588,"imdb_id":"tt0384537","title":"Silent Hill","poster_path":"/4Zz9cF8S4E7DITosNYh3spybYJb.jpg"},{"id":1576,"imdb_id":"tt0120804","title":"Resident Evil","poster_path":"/5jdvEi57WBGuI5n2drG8FLAbYDp.jpg"},{"id":293660,"imdb_id":"tt1431045","title":"Deadpool","poster_path":"/inVq3FRqcYIRl2la8iZikYYxFNR.jpg"}], "user_id":"5a024f9b60375008f87cfe07" }
var spawn = require('child_process').spawn, py = spawn('python', ['receive_json_obj.py']), data = obj, dataString ='';
var recommendations = [];


py.stdout.on('data', function(data){
  dataString = data.toString();
});

// add elements to recommendation array
py.stdout.on('end', function(){
  
  recommendations.push(dataString);
  for(var i =0; i < recommendations.length; i++){
   	console.log(recommendations[i]);
  }
});

py.stdin.write(JSON.stringify(data));
py.stdin.end();