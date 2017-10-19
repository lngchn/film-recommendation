const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/filmpro'; //filmpro indicates the database to use

module.exports = {
  findKey: function() {
    return MongoClient.connect(url).then(function(db) {
      var collection = db.collection('apikey');
      return collection.findOne();
    }).then(function(items) {
      return items;
    });
  }
};