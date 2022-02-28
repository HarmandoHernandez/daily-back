// @ts-check

// eslint-disable-next-line no-unused-vars
const { request, response } = require('express')

/**
 * Register API request
 * @param {request} req API Request
 * @param {response} _ API Response
 * @param {any} next
 * @returns any
 */
const logger = (req, _, next) => {
  const log = `_> ${req.originalUrl} | ${req.method} | ${JSON.stringify(req.body)}`
  console.error(log)
  next()
}

module.exports = logger
