const { response } = require('express')
const bcrypt = require('bcryptjs')

const {
  VALIDATORS,
  AUTH_PARAMS
} = require('../shared/enums')

const Usuario = require('../user/usuario.model')
const { generateJWT } = require('../shared/helpers/jwt.helper')
const { responseError, responseSuccess } = require('../shared/helpers/responses.helper')

const createUser = async (req, res = response) => {
  const { email, name, password } = req.body
  try {
    const usuario = await Usuario.findOne({ email })
    if (usuario) {
      return responseError(res, 400, VALIDATORS.INVALID, AUTH_PARAMS.EMAIL)
    }
    // Crear usuario con el modelo
    const dbUser = new Usuario(req.body)
    // Hashear la contraseña
    const salt = bcrypt.genSaltSync()
    dbUser.password = bcrypt.hashSync(password, salt)
    // Generar el JWT
    const token = await generateJWT(dbUser.id, name)
    // Guardar usuario en DB
    await dbUser.save()
    // Generar respuesta exitosa
    responseSuccess(res, 201, dbUser.id, name, token)
  } catch (error) {
    console.error(error)
    return responseError(res)
  }
}

const loginUser = async (req, res = response) => {
  const { email, password } = req.body
  try {
    const dbUser = await Usuario.findOne({ email })
    if (!dbUser) {
      return responseError(res, 400, VALIDATORS.INVALID, AUTH_PARAMS.EMAIL)
    }
    // Confirmar si el password hace match
    const validPassword = bcrypt.compareSync(password, dbUser.password)
    if (!validPassword) {
      return responseError(res, 400, VALIDATORS.INVALID, AUTH_PARAMS.PASSWORD)
    }
    // Generar el JWT
    const token = await generateJWT(dbUser.id, dbUser.name)

    responseSuccess(res, 201, dbUser.id, dbUser.name, token)
  } catch (error) {
    console.error(error)
    return responseError(res)
  }
}

const validToken = async (req, res = response) => {
  try {
    const { uid, name } = req
    // Generar el JWT
    const token = await generateJWT(uid, name)
    // Respuesta con nuevo token
    responseSuccess(res, 201, uid, name, token)
  } catch (error) {
    console.error(error)
    return responseError(res)
  }
}

module.exports = {
  createUser,
  loginUser,
  validToken
}
