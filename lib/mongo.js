const MongoClient = require('mongodb').MongoClient;
module.exports = (app) => {
  app.beforeStart(async function() {
    const mongo = {
      MongoClient
    };
    if (app && app.config && app.config.mongo) {
      const config = app.config.mongo;
      if (config.url && config.dbName) {
        app.mongo = mongo;
        MongoClient.connect(app.config.mongo.url, (error, client) => {
          if (error) throw '[ mongodb ] Connected errorfully to server';
          mongo.db = client;
          if (config.close) {
            client.close();
          }
        });
      }
    }
  });
};