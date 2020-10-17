const { MongoClient } = require("mongodb");

const uri = "mongodb://root:password@server-database:27017";

let connection;

module.exports = {
  connect: function(callback) {
    MongoClient.connect(uri,  { useUnifiedTopology: true }, function(err, client) {
      connection = client.db('strava');
      return callback(err);
    });
  },

  getConnection: function() {
    return connection;
  }
};