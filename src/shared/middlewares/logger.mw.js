// @ts-check

// eslint-disable-next-line no-unused-vars
const { request, response } = require('express')

/**
 * Register API request
 */
const logger = (req = request, _, next) => {
  const log = `_> ${req.originalUrl} | ${req.method} | ${JSON.stringify(req.body)}`
  console.error(log)
  next()
}

module.exports = logger
