const express = require('express');
const app = express();
const path = require('path');
var MongoClient = require('mongodb').MongoClient;

//port
app.set( 'port', process.env.PORT || 3001 );

app.get('/', function (req, res) {
  res.send('Server running')
});
/*
MongoClient.connect('mongodb://localhost:27017/userdb', function (err, db) {
  if (err) throw err
});
*/
app.listen( app.get('port'), function () {
    console.log('Server running at http://localhost:%s', app.get('port'));
});