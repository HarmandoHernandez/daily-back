// @ts-check

const { response, request } = require('express')

const ActivityService = require('./activity.service')
const STATUS = require('../shared/enums/status.enum')
const ActivityFormat = require('../shared/helpers/responses/activity.format')
const STATUS_CODES = require('../shared/enums/status-codes.enums')
const getStatusCode = require('../shared/helpers/status-code.helper')

const activityService = new ActivityService()

class ActivityController {
  /**
     * Create one activity of an User
     */
  async createOne (req = request, res = response) {
    // @ts-ignore
    const { uid: user } = req
    const { icon, title, startTime, durationTime } = req.body
    const activityData = new ActivityFormat(icon, title, startTime, durationTime, user)
    // Guardar DB
    const response = await activityService.createOne(activityData)

    if (response.status === STATUS.SUCCESS) {
      return res.status(STATUS_CODES.CREATED).json(response)
    }
    // STATUS: ERROR
    const status = getStatusCode(response.message[0].error)
    return res.status(status).json(response)
  }

  /**
     * Get one activity of an User
     */
  async getOneById (req = request, res = response) {
    const { id } = req.params
    const response = await activityService.getOneById(id)

    if (response.status === STATUS.SUCCESS) {
      return res.status(STATUS_CODES.OK).json(response)
    }
    // STATUS: ERROR
    const status = getStatusCode(response.message[0].error)
    return res.status(status).json(response)
  }

  /**
     * Update one activity of an User
     */
  async updateOne (req = request, res = response) {
    console.log('here')
    // @ts-ignore
    const { user } = req
    const { id } = req.params
    const { icon, title, startTime, durationTime } = req.body
    const activityData = new ActivityFormat(icon, title, startTime, durationTime, user, id)
    // Guardar DB
    const response = await activityService.updateOne(activityData)

    if (response.status === STATUS.SUCCESS) {
      return res.status(STATUS_CODES.OK).json(response)
    }
    // STATUS: ERROR
    const status = getStatusCode(response.message[0].error)
    return res.status(status).json(response)
  }

  /**
     * Delete one activity of an User
     */
  async deleteOne (req = request, res = response) {
    const { id } = req.params
    const response = await activityService.deleteOne(id)

    if (response.status === STATUS.SUCCESS) {
      return res.status(STATUS_CODES.OK).json(response)
    }
    // STATUS: ERROR
    const status = getStatusCode(response.message[0].error)
    return res.status(status).json(response)
  }
}

module.exports = ActivityController
