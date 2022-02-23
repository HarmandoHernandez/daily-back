const validParams = require('./valid-params.mw')
const validJWT = require('./valid-jwt.mw')
const logger = require('./logger.mw')

module.exports = {
  ...validParams,
  ...validJWT,
  ...logger
}
