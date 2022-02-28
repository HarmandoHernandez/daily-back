// @ts-check

// eslint-disable-next-line no-unused-vars
const { response, request } = require('express')
const { default: STATUS } = require('../shared/enums/status.enum')

const ActivityC = require('./activity')
const ActivityService = require('./activity.service')

const activityService = new ActivityService()

class ActivityController {
  /**
     * Create one activity of an User
     * @param {request} req
     * @param {response} res
     */
  async createOne (req, res) {
    const { user } = req.params
    const { icon, title, startTime, durationTime } = req.body
    const activityData = new ActivityC('', icon, title, startTime, durationTime, user)
    // Guardar DB
    const response = await activityService.createOne(activityData)
    if (response.status === STATUS.SUCCESS) {
      return res.status(201).json(response)
    }
    return res.status(400).json(response)
  }

  /**
     * Get one activity of an User
     * @param {request} req
     * @param {response} res
     */
  async getOneById (req, res) {
    const { id } = req.params
    console.log(id)
    const response = await activityService.getOneById(id)
    if (response.status === STATUS.SUCCESS) {
      return res.status(200).json(response)
    }
    return res.status(400).json(response)
  }

  /**
     * Update one activity of an User
     * @param {request} req
     * @param {response} res
     */
  async updateOne (req, res) {
    const { id } = req.params
    const { icon, title, startTime, durationTime } = req.body
    const activityData = new ActivityC(id, icon, title, startTime, durationTime)
    // Guardar DB
    const response = await activityService.updateOne(activityData)
    if (response.status === STATUS.SUCCESS) {
      return res.status(201).json(response)
    }
    return res.status(400).json(response)
  }

  /**
     * Delete one activity of an User
     * @param {request} req
     * @param {response} res
     */
  async deleteOne (req, res) {
    const { id } = req.params
    const response = await activityService.deleteOne(id)
    if (response.status === STATUS.SUCCESS) {
      return res.status(201).json(response)
    }
    return res.status(400).json(response)
  }
}

module.exports = ActivityController
