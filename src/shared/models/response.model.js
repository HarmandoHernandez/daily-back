class GeneralFormat {
  constructor (status, message) {
    this.status = status
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
