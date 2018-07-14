# egg-mongo

Database ` mongo ` plug-in for ` egg ` provide ` mongo ` database access functions

#  Install

```
$ npm i egg-mongo --save
```

# Configuration

Change `${app_root}/config/plugin.js` to enable MongoDB plugin:


```
exports.mongo = {
  enable: true,
  package: 'egg-mongo',
};
```

Configure database information in `${app_root}/config/config.default.js`:


Simple database instance

```
//  app/config/config.default.js
mongo: {
  url: 'mongodb://localhost:27017',
  dbname: 'dbName'
}
```

```
// app/controller/home.js
class HomeController extends Controller {
  async index() {
    const testCollection = this.app.mongo.db.collection('testCollection');
    collectionNames = await testCollection.find({}).toArray();
    this.ctx.body = collectionNames;
  }
}
```
