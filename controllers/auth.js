const { response } = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')
const { GeneralFormat, SuccessFormat } = require('../models/Response')

const VALIDATORS = require('../enums/validators')
const STATUS = require('../enums/status')
const AUTH_PARAMS = require('../enums/auth-params')
const Error = require('../models/Error')

const crearUsuario = async (req, res = response) => {
  const { email, name, password } = req.body
  try {
    const usuario = await Usuario.findOne({ email })
    if (usuario) {
      return res
        .status(400)
        .json(new GeneralFormat(
          STATUS.ERROR,
          [new Error(VALIDATORS.INVALID, AUTH_PARAMS.EMAIL)]
        ))
    }
    // Crear usuario con el modelo
    const dbUser = new Usuario(req.body)
    // Hashear la contraseña
    const salt = bcrypt.genSaltSync()
    dbUser.password = bcrypt.hashSync(password, salt)
    // Generar el JWT
    const token = await generarJWT(dbUser.id, name)
    // Guardar usuario en DB
    await dbUser.save()
    // Generar respuesta exitosa
    const successRes = new SuccessFormat(dbUser.id, name, token)
    return res
      .status(201)
      .json(new GeneralFormat(STATUS.SUCCESS, successRes))
  } catch (error) {
    return res
      .status(400)
      .json(new GeneralFormat(
        STATUS.ERROR,
        [new Error(STATUS.ERROR, STATUS.ERROR)]
      ))
  }
}

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body
  try {
    const dbUser = await Usuario.findOne({ email })
    if (!dbUser) {
      return res
        .status(400)
        .json(new GeneralFormat(
          STATUS.ERROR,
          [new Error(VALIDATORS.INVALID, AUTH_PARAMS.EMAIL)]
        ))
    }
    // Confirmar si el password hace match
    const validPassword = bcrypt.compareSync(password, dbUser.password)
    if (!validPassword) {
      return res
        .status(400)
        .json(new GeneralFormat(
          STATUS.ERROR,
          [new Error(VALIDATORS.INVALID, AUTH_PARAMS.PASSWORD)]
        ))
    }
    // Generar el JWT
    const token = await generarJWT(dbUser.id, dbUser.name)
    // Respuesta del servicio
    const successRes = new SuccessFormat(dbUser.id, dbUser.name, token)
    return res.json(new GeneralFormat(STATUS.SUCCESS, successRes))
  } catch (error) {
    return res
      .status(500)
      .json(new GeneralFormat(
        STATUS.ERROR,
        [new Error(STATUS.ERROR, STATUS.ERROR)]
      ))
  }
}

const revalidarToken = async (req, res = response) => {
  const { uid, name } = req
  // Generar el JWT
  const token = await generarJWT(uid, name)
  // Respuesta con nuevo token
  const successRes = new SuccessFormat(uid, name, token)
  return res.json(new GeneralFormat(STATUS.SUCCESS, successRes))
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}
