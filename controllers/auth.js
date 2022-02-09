const { response } = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')
const { GeneralFormat, SuccessFormat } = require('../models/Response')

const crearUsuario = async (req, res = response) => {
  const { email, name, password } = req.body
  try {
    // Verificar email existente
    const usuario = await Usuario.findOne({ email })
    if (usuario) {
      return res
        .status(400)
        .json(new GeneralFormat('ERROR', 'El usuario ya existe con ese email'))
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
      .json(new GeneralFormat('SUCCESS', successRes))
  } catch (error) {
    return res
      .status(400)
      .json(new GeneralFormat('ERROR', 'Por favor hable con el administrador'))
  }
}

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body
  try {
    const dbUser = await Usuario.findOne({ email })
    if (!dbUser) {
      return res
        .status(400)
        .json(new GeneralFormat('ERROR', 'El correo no existe'))
    }
    // Confirmar si el password hace match
    const validPassword = bcrypt.compareSync(password, dbUser.password)
    if (!validPassword) {
      return res
        .status(400)
        .json(new GeneralFormat('ERROR', 'El password no es válido'))
    }
    // Generar el JWT
    const token = await generarJWT(dbUser.id, dbUser.name)
    // Respuesta del servicio
    const successRes = new SuccessFormat(dbUser.id, dbUser.name, token)
    return res.json(new GeneralFormat('SUCCESS', successRes))
  } catch (error) {
    return res
      .status(500)
      .json(new GeneralFormat('ERROR', 'Hable con el administrador'))
  }
}

const revalidarToken = async (req, res = response) => {
  const { uid, name } = req
  // Generar el JWT
  const token = await generarJWT(uid, name)
  // Respuesta con nuevo token
  const successRes = new SuccessFormat(uid, name, token)
  return res.json(new GeneralFormat('SUCCESS', successRes))
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}
