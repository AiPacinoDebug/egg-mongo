# egg-mongo

`mongo` 插件是为 `egg` 提供 `mongo` 数据库访问的功能

#  安装

```
$ npm i egg-mongo --save
```

# 配置

通过 `config/plugin.js` 配置启动 `MongoDB` 插件:
```
exports.mongo = {
  enable: true,
  package: 'egg-mongo',
};
```

在 `config/config.${env}.js` 配置各个环境的数据库连接信息：

```
mongo: {
  urlConfig: {
    host: '127.0.0.1',
    port: '27017'
  },
  dbname: 'dbName',
  username: '',
  password: ''
}
```

#  多数据源
```
mongo: {
  urlConfig: [{
    host: '127.0.0.1',
    port: '27017'
  }, {
    host: '127.0.0.1',
    port: '27018'
  }],
  dbname: 'dbName',
  username: '',
  password: ''
}
```


[更多数据库链接参数详情......](http://mongodb.github.io/node-mongodb-native/2.2/tutorials/connect/)

#  使用方式

`app/service/home.js`
```
'use strict';
module.exports = app => {
  return class HomeController extends app.Controller {
    get collectionName() {
      return 'qrcode';
    }
    getCollectionDB() {
      return app.mongo.getQuery('qrcode');
    }
    * page() {
      const qrcode = this.getCollectionDB();
      this.ctx.body = yield qrcode.find();
    }
  };
};
```

[更多......](https://github.com/mzTeamMeatMan/mongo-co)