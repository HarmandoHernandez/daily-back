const Error = require('./error.model')
const response = require('./response.model')
const Route = require('./route.model')

module.exports = {
  Error,
  ...response,
  Route
}
