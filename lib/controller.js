"use strict";
const Model = require('./model');
const Validation = require('./validation');
const crypto = require('crypto');

class Controller {

  static async login(req, res) {
    let login;

    if (req.body.email && Validation.email(req.body.email))
      login = {email: req.body.email};
    else if (req.body.phone && Validation.phone(req.body.phone))
      login = {phone: req.body.phone};
    else
      return res.status(400).end();

    try {
      const code = await Controller._mkRandomChars(3);
      await Model.setLoginCode(login, code);

      // TODO: Send the login code
      console.log("Code:", code);

    } catch (e) {
      // TODO: LOG
      return res.status(400).end();
    }

    res.status(200).end();
  }

  static async verifyLoginCode(req, res) {
    let where, loginCode, token;
    const code = req.body.code;

    if (req.body.email && Validation.email(req.body.email))
      where = {email: req.body.email};
    else if (req.body.phone && Validation.phone(req.body.phone))
      where = {phone: req.body.phone};
    else
      return res.status(400).end();

    try {
      loginCode = await Model.getLoginCode(where);

      // verifying code
      if (!loginCode || !code || code !== loginCode.code)
        return res.status(499).end();

      // no need to code anymore
      Model.removeLoginCode(where).catch(e => {
        // TODO: LOG
      });

      if (Controller._diffWithCurrentDate(loginCode.time) > 15)
        return res.status(498).end();

      // open a session
      token = await Controller._mkRandomChars(32);
      await Model.setSession(where, token);

    } catch (e) {
      // TODO: LOG
      return res.status(400).end();
    }

    res.status(200).json({token: token});
  }

  static async authentication(req, res) {
    const token = req.body.token;
    Model.verifySession(token)
      .then(id => id ? res.status(200).json({id: id}) : res.status(401).end())
      .catch(() => {
        // TODO: LOG
        res.status(500).end();
      });
  }

  static async removeSession(req, res) {
    const token = req.body.token;
    Model.removeSession(token)
      .then(() => res.status(200).end())
      .catch(() => {
        // TODO: LOG
        res.status(500).end();
      });
  }

  static async getUser(req, res) {
    const whereObj = req.body;

    let userObj;

    try {
      userObj = await Model.getUser(whereObj);
    } catch (e) {
      return res.status(400).end();
    }

    if (!userObj)
      return res.status(404).end();

    res.status(200).json(userObj);
  }

  /**
   * @param {number} length
   * @return {Promise<string>}
   * @private
   */
  static async _mkRandomChars(length) {
    return await new Promise((resolve, reject) => crypto.randomBytes(length, function (err, buffer) {
      err ? reject(err) : resolve(buffer.toString('hex'));
    }));
  }

  /**
   * @param {string} date
   * @return {Number} minutes
   * @private
   */
  static _diffWithCurrentDate(date) {
    return Number(((new Date()) - (new Date(date))) / (1000 * 60));
  }

}

module.exports = Controller;
