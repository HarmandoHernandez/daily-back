const { response } = require('express')
const jwt = require('jsonwebtoken')
const { GeneralFormat } = require('../models/Response')

const VALIDATORS = require('../enums/validators')
const STATUS = require('../enums/status')
const AUTH_PARAMS = require('../enums/auth-params')
const Error = require('../models/Error')

const validarJWT = (req, res = response, next) => {
  const token = req.header('x-token')
  if (!token) {
    const reponse = new GeneralFormat(
      STATUS.ERROR,
      [new Error(VALIDATORS.REQUIRED, AUTH_PARAMS.TOKEN)]
    )
    return res
      .status(401)
      .json(reponse)
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)
    req.uid = uid
    req.name = name
  } catch (error) {
    return res
      .status(401)
      .json(new GeneralFormat(
        STATUS.ERROR,
        [new Error(VALIDATORS.INVALID, AUTH_PARAMS.TOKEN)]
      ))
  }
  next()
}

module.exports = {
  validarJWT
}
