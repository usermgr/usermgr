"use strict";
const {MongoClient} = require('mongodb');
const cfg = require('../config');

const mongo = new MongoClient(cfg.mongo.uri, cfg.mongo.options);

class Model {

  /**
   * @type {Promise<MongoClient>}
   */
  static init;

  /**
   * @type {Collection}
   */
  static mongo;

  constructor() {
    Model.init = (async () => {
      await mongo.connect();

      Model.mongo = mongo.db(cfg.mongo.database).collection(cfg.mongo.collection);

    })();
  }

  /**
   * @param {object} where
   * @param {string} code
   * @return {Promise<void>}
   */
  static async setLoginCode(where, code) {
    await Model.init;
    const result = await Model.mongo.updateOne(where, {
        $set: {
          loginCode: {code: code, time: (new Date().toUTCString())}
        }
      },
      {upsert: true});

    if (result.upsertedCount !== 1 && result.modifiedCount !== 1)
      throw new Error();    // TODO
  }

  /**
   * @param {object} where
   * @return {Promise<{code: string, time: string}|null>}
   */
  static async getLoginCode(where) {
    await Model.init;
    const result = await Model.mongo.findOne(where, {projection: {loginCode: 1, _id: 0}});
    return result ? result.loginCode : null;
  }

  /**
   * @param {object} where
   * @return {Promise<boolean>}
   */
  static async removeLoginCode(where) {
    const result = await Model.mongo.updateOne(where, {$unset: {loginCode: 1}});
    return result.deletedCount === 1;
  }

  /**
   * @param {object} where
   * @param {string} token
   * @return {Promise<void>}
   */
  static async setSession(where, token) {
    await Model.mongo.updateOne(where, {$push: {sessions: {token: token}}});
  }

  /**
   * @param {string} token
   * @return {Promise<boolean>}
   */
  static async verifySession(token) {
    const result = await Model.mongo.findOne({sessions: {$elemMatch: {token: token}}}, {projection: {_id: 1}});
    return result ? result._id : false;
  }

  /**
   * @param {string} token
   * @return {Promise<void>}
   */
  static async removeSession(token) {
    await Model.mongo.updateOne({sessions: {$elemMatch: {token: token}}}, {$pull: {sessions: {token: token}}});
  }

  /**
   *
   * @param {object} whereObj
   * @return {Promise<*>}
   */
  static async getUser(whereObj) {
    await Model.init;

    return (await Model.mongo.findOne(whereObj));
  }

  /**
   * @param {object} obj
   * @private
   */
  static _removeReservedFields(obj) {
    if (obj._id)
      delete obj._id;

    if (obj.session)
      delete obj.session;
  }

}

new Model();
module.exports = Model;
