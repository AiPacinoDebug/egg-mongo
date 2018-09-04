const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const assert = require("assert");

module.exports = (app) => {

  assert(app, '需要在 egg.js 中使用');
  assert(app.config, '需要配置 config');
  assert(app.config.mongo, '需要在 config 中配置 mongo');

  const funcs = [];
  const { db: host, option } = app.config.mongo;

  // 事件，连接成功后执行
  app.mongoReady = func => {
    funcs.push(func);
  };

  app.beforeStart(async function() {
    const _dbConnect = await MongoClient
      .connect(`mongodb://${host.url}:${host.port}/${host.dbname}`, option);

    app.mongo = new Dbconnect(_dbConnect).db(host.dbname);
    funcs.map(async (func) => {
      await func();
    });
    return;
  });
};


class Dbconnect {
  constructor(dbConnect) {
      this.mongodb = dbConnect;
  }
  db(dbName) {
    return (collection) => {
      const columns=["count","distinct","findAndModify"];
      columns.forEach(col => {
        mongoCo.prototype[col] = async function (...arg) {
          return await this.dbConnect[col].apply(this.dbConnect,arg);
        };
      });
      return new mongoCo(collection, this.mongodb.db(dbName));
    }
  }
}

class mongoCo {
  constructor(collection, db) {
    this.dbConnect = db.collection(collection);
    this.mongoskin = db;
  }
  async save(arg) {
    const data = await this.dbConnect.save(arg);
    return data.ops[0];
  }
  async remove(arg) {
    const data = this.dbConnect.remove(arg);
    return data.result.n;
  }
  async update(...arg) {
    //nModified
    const data = this.dbConnect.update.apply(this.dbConnect, arg);
    return data.result.nModified;
  }
  async find(...arg) {
    return await this.dbConnect.find.apply(this.dbConnect, arg).toArray();
  }
  async findOne(...arg) {
    return await this.dbConnect.findOne.apply(this.dbConnect, arg);
  }
  async aggregate(...arg) {
    return await this.dbConnect.aggregate.apply(this.dbConnect,arg).toArray();
  }
}


