// @ts-check
const logger = (req, _, next) => {
  const log = `_> ${req.originalUrl} | ${req.method} | ${JSON.stringify(req.body)}`
  console.error(log)
  next()
}

module.exports = { logger }
