// @ts-check

const { response, request } = require('express')

const ActivityService = require('./activity.service')
const STATUS = require('../shared/enums/status.enum')

const activityService = new ActivityService()

class ActivityController {
  /**
     * Create one activity of an User
     */
  async createOne (req = request, res = response) {
    const { user } = req.params
    const { icon, title, startTime, durationTime } = req.body
    // Guardar DB
    const response = await activityService.createOne({ icon, title, startTime, durationTime, user })
    if (response.status === STATUS.SUCCESS) {
      return res.status(201).json(response)
    }
    return res.status(400).json(response)
  }

  /**
     * Get one activity of an User
     */
  async getOneById (req = request, res = response) {
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
     */
  async updateOne (req = request, res = response) {
    const { id } = req.params
    const { icon, title, startTime, durationTime } = req.body
    // Guardar DB
    const response = await activityService.updateOne({ id, icon, title, startTime, durationTime })
    if (response.status === STATUS.SUCCESS) {
      return res.status(201).json(response)
    }
    return res.status(400).json(response)
  }

  /**
     * Delete one activity of an User
     */
  async deleteOne (req = request, res = response) {
    const { id } = req.params
    const response = await activityService.deleteOne(id)
    if (response.status === STATUS.SUCCESS) {
      return res.status(201).json(response)
    }
    return res.status(400).json(response)
  }
}

module.exports = ActivityController
