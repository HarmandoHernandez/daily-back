// @ts-check
// eslint-disable-next-line no-unused-vars
const { response, request } = require('express')

// Custom
const VALIDATORS = require('../enums/validators.enum')
const STATUS_CODES = require('../enums/status-codes.enums')
const getAnErrorResponse = require('../helpers/responses/error.response')
const ActivityService = require('../../activity/activity.service')
const ACTIVITY_PARAMS = require('../../activity/activity.enum')

// Instances
const activityService = new ActivityService()

/**
 * Evaluate token of request
 */
const validActivityOwner = async (req = request, res = response, next) => {
  // @ts-ignore
  const { uid: user } = req
  const { id } = req.params
  try {
    // Consultar user in BD
    const activityResp = await activityService.getActivityOwner(id)
    console.log('activityResp', activityResp, user)
    if (activityResp === null || activityResp.toString() !== user) {
      const errorRespose = getAnErrorResponse(VALIDATORS.WITHOUT, ACTIVITY_PARAMS.ACTIVITY)
      return res.status(STATUS_CODES.UNAUTHORIZED).json(errorRespose)
    }
  } catch (error) {
    // const errorRespose = getAnErrorResponse(VALIDATORS.NOEXIST, ACTIVITY_PARAMS.ACTIVITY)
    return res.status(STATUS_CODES.NO_CONTENT) // .json(errorRespose)
  }
  next()
}

module.exports = validActivityOwner
