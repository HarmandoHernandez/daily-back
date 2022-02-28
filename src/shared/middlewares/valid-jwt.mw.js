// @ts-check
// eslint-disable-next-line no-unused-vars
const { response, request } = require('express')
const jwt = require('jsonwebtoken')

// Custom
const UserService = require('./../../user/user.service')
const USER_PARAMS = require('../../user/user.enum')
const AUTH_PARAMS = require('./../../auth/auth.enum')
const VALIDATORS = require('../enums/validators.enum')
const STATUS_CODES = require('../enums/status-codes.enums')
const getAnErrorResponse = require('./../helpers/responses/error.response')

// Instances
const userService = new UserService()

/**
 * Evaluate token of request
 * @param {request} req API Request
 * @param {response} res API Response
 * @param {any} next
 * @returns any
 */
const validJWT = (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    const errorRespose = getAnErrorResponse(VALIDATORS.REQUIRED, AUTH_PARAMS.TOKEN)
    return res.status(STATUS_CODES.PARTIAL_CONTENT).json(errorRespose)
  }
  try {
    // @ts-ignore
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)
    // Consultar user in BD
    const user = userService.getOneById(uid)

    if (user === null) {
      const errorRespose = getAnErrorResponse(VALIDATORS.NOEXIST, USER_PARAMS.USER)
      return res.status(STATUS_CODES.NO_CONTENT).json(errorRespose)
    }

    // @ts-ignore
    req.uid = uid
    // @ts-ignore
    req.name = name
  } catch (error) {
    const errorRespose = getAnErrorResponse(VALIDATORS.INVALID, AUTH_PARAMS.TOKEN)
    return res.status(STATUS_CODES.UNAUTHORIZED).json(errorRespose)
  }
  next()
}

module.exports = validJWT
