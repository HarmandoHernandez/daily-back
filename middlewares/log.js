const { response } = require('express')

const log = (req, res = response, next) => {
  const log = `> ${req.originalUrl} | ${req.method} | ${JSON.stringify(req.body)} <`
  console.log(log)
  next()
}

module.exports = { log }
