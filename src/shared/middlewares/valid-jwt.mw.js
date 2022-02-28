// @ts-check
const { response, request } = require('express')
const jwt = require('jsonwebtoken')

// Custom
const { responseError } = require('../helpers/responses.helper')
const { VALIDATORS } = require('./../enums')
const AUTH_PARAMS = require('./../../auth/auth.enum')
const UserService = require('./../../user/user.service')
// Instances
const userService = new UserService()

const validJWT = (req = request, res = response, next) => {
  const token = req.header('x-token')
  if (!token) {
    return responseError(res, 401, VALIDATORS.REQUIRED, AUTH_PARAMS.TOKEN)
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)

    // Consultar user in BD
    const user = userService.getOneById(uid)
    if (user === null) {
      return responseError(res, 401, VALIDATORS.NOEXIST, AUTH_PARAMS.USER)
    }

    req.uid = uid
    req.name = name
  } catch (error) {
    console.log(error)
    return responseError(res, 401, VALIDATORS.INVALID, AUTH_PARAMS.TOKEN)
  }
  next()
}

module.exports = {
  validJWT
}
