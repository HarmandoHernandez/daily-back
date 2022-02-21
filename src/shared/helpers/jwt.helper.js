const jwt = require('jsonwebtoken')

const generateJWT = (uid = '', name = 'No name') => {
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
