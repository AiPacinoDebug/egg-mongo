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
          mongo.error = error;
          mongo.client = client;
          mongo.db = mongo.client.db(config.dbName);
        });
      }
    }
  });
};