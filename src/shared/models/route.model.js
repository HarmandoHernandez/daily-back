// @ts-check

// eslint-disable-next-line no-unused-vars
const { Router } = require('express')

class Route {
  /**
   * Model of a router
   * @param {string} path Access address
   * @param {Router} routes API Router
   */
  constructor (path, routes) {
    this.path = path
    this.routes = routes
  }
}

module.exports = Route
