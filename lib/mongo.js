const MongoClient = require('mongodb').MongoClient;
module.exports = (app) => {
  app.beforeStart(async function() {
    if (app && app.config && app.config.mongo) {
      if (app.config.mongo.url && app.config.mongo.dbName) {
        app.mongo = {
          MongoClient
        };
        app.mongo = MongoClient.connect(app.config.mongo.url, (error, client) => {
          if (error) throw '[ mongodb ] Connected errorfully to server';
          app.mongo.db = client;
          if (app.config.mongo.close) {
            client.close();
          }
        });
      }
    }
  });
};