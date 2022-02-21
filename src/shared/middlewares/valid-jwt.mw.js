const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const { responseError } = require('../helpers/responses.helper')
const { VALIDATORS, AUTH_PARAMS } = require('../enums')

const validJWT = (req = request, res = response, next) => {
  const token = req.header('x-token')
  if (!token) {
    return responseError(res, 401, VALIDATORS.REQUIRED, AUTH_PARAMS.TOKEN)
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)
    req.uid = uid
    req.name = name
  } catch (error) {
    return responseError(res, 401, VALIDATORS.INVALID, AUTH_PARAMS.TOKEN)
  }
  next()
}

module.exports = {
  validJWT
}
