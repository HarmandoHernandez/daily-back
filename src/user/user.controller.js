// @ts-check
// eslint-disable-next-line no-unused-vars
const { response, request } = require('express')

// Customs
const STATUS = require('../shared/enums/status.enum')
const STATUS_CODES = require('../shared/enums/status-codes.enums')
const getStatusCode = require('../shared/helpers/status-code.helper')
const UserService = require('./user.service')
// Instances
const userService = new UserService()

class UserController {
  /**
     * Get an User
     */
  async getById (req = request, res = response) {
    const { id } = req.params
    const response = await userService.getOneById(id)

    if (response.status === STATUS.SUCCESS) {
      return res.status(STATUS_CODES.OK).json(response)
    }
    // STATUS: ERROR
    const status = getStatusCode(response.message[0].error)
    return res.status(status).json(response)
  }
}

module.exports = UserController
