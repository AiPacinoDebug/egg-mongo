const mongoCo = require('mongo-co')();
module.exports = (app) => {
  app.beforeStart(function *() {
    app.mongo = yield mongoCo(app.config.mongo);// eslint-disable-line
  });
};