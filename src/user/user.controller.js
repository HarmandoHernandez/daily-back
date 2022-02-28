// @ts-check
// eslint-disable-next-line no-unused-vars
const { response, request } = require('express')
// Customs
const STATUS = require('../shared/enums/status.enum')
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
      return res.status(200).json(response)
    }
    return res.status(400).json(response)
  }
}

module.exports = UserController
