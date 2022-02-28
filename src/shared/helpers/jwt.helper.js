// @ts-check
const jwt = require('jsonwebtoken')

// eslint-disable-next-line no-unused-vars
const { ObjectId } = require('mongoose')

/**
 * Build a new token for an user
 * @param {ObjectId} uid User identification
 * @param {string} name User name
 * @returns {Promise<string>} New user token
 */
const generateJWT = (uid, name) => {
  const payload = { uid, name }
  const SECRET_JWT_SEED = process.env.SECRET_JWT_SEED

  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_JWT_SEED, {
      expiresIn: '10h'
    }, (err, token) => {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = {
  generateJWT
}
