"use strict";

/**
 * User Class
 */
class User {

  /**
   * @type {number}
   * @private
   */
  _id;

  /**
   * @type {Object<string, *>}
   * @private
   */
  _metadata;

  /**
   * Get the user's id
   * @return {number}
   */
  id() {

  }

  /**
   * Get user's metadata
   * @param {string} name
   * @param {*} def
   * @param {boolean} fromJson
   * @return {*}
   */
  get(name, def = null, fromJson = false) {

  }

  /**
   * Add user's metadata
   * @param {string} name
   * @param {number|string|boolean} value
   * @param {boolean} toJson
   */
  set(name, value, toJson = false) {

  }

  /**
   * Check the user's access
   * @param {string} key
   * @return {boolean}
   */
  guard(key) {

  }

  /**
   * Grant access to the user
   * @param {string} key
   * @return {User}
   */
  grant(key) {

  }

  /**
   * Logout the user from the current session
   * @return {boolean}
   */
  logout() {

  }

}

module.exports = User;
