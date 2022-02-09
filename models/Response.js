class GeneralFormat {
  constructor (statusCode, message) {
    console.log(statusCode, ': ', message)
    this.statusCode = statusCode
    this.message = message
  }
}

class SuccessFormat {
  constructor (uid, name, token) {
    this.uid = uid
    this.name = name
    this.token = token
  }
}

module.exports = {
  GeneralFormat,
  SuccessFormat
}
