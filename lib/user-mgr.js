"use strict";
const crypto = require('crypto');

/**
 * UserMgr Class
 */
class UserMgr {

  /**
   * Object of users
   *
   * key: user's id, value: User
   *
   * @type Object<number, User>
   * @private
   */
  static _users = {};

  /**
   * Object of tokens
   *
   * key: token, value: user's id
   *
   * @type {Object<string, number>}
   * @private
   */
  static _tokens = {};

  /**
   * Object of blocked users
   *
   * key: user's id, value: true
   *
   * @type {Object<number, boolean>}
   * @private
   */
  static _blocks = {};

  /**
   * Authentication
   * @param {string} token
   * @return UserMgr
   */
  static auth(token) {

  }

  /**
   * Login the user
   * @param {string} username
   * @param {string} password
   * @param {?{userAgent: string, ip: string}} extras
   */
  static login(username, password, extras = null) {

  }

  /**
   * Logout from the all sessions
   * @param {string} username
   */
  static logoutAll(username) {

  }

  /**
   * Register new user
   * @param {string} username
   * @param {string} password
   */
  static register(username, password) {

  }

  /**
   * Block the user
   * @param {string} username
   */
  static block(username) {

  }

  /**
   * Unblock the user
   * @param {string} username
   */
  static unblock(username) {

  }

  /**
   * Generate the unique token
   * @private
   * @return {Promise<string>}
   */
  static async _generateToken() {
    let token;

    // unique token
    do {
      token = await new Promise((resolve, reject) => crypto.randomBytes(48, function (err, buffer) {
        err ? reject(err) : resolve(buffer.toString('hex'));
      }));
    } while (UserMgr._tokens[token]);

    return token;
  }

}

module.exports = UserMgr;
