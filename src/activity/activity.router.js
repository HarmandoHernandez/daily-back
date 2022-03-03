// @ts-check

const { Router } = require('express')
const { check } = require('express-validator')
const ActivityController = require('./activity.controller')

const {
  validParams,
  logger,
  validJWT
} = require('../shared/middlewares')
const ACTIVITY_PARAMS = require('./activity.enum')
const VALIDATORS = require('../shared/enums/validators.enum')
const validActivityOwner = require('../shared/middlewares/valid-activity-owner.mw')

const router = Router()
const activityController = new ActivityController()

router.post('/', [
  logger,
  check(ACTIVITY_PARAMS.ICON, VALIDATORS.REQUIRED).not().isEmpty(),
  check(ACTIVITY_PARAMS.TITLE, VALIDATORS.REQUIRED).not().isEmpty(),
  check(ACTIVITY_PARAMS.START_TIME, VALIDATORS.REQUIRED).not().isEmpty(), // TODO: Validar formato: "XX:XX"
  check(ACTIVITY_PARAMS.DURATION_TIME, VALIDATORS.INVALID).isNumeric(),
  validParams,
  validJWT
], activityController.createOne)

router.get(`/:${ACTIVITY_PARAMS.ID}`, [
  logger,
  check(ACTIVITY_PARAMS.ID, VALIDATORS.CORRUPT).isMongoId(),
  validParams,
  validJWT,
  validActivityOwner
  // TODO: verify if is the ownser of id activity
  // If user, contains id in activities
], activityController.getOneById)

router.patch(`/:${ACTIVITY_PARAMS.ID}`, [
  logger,
  check(ACTIVITY_PARAMS.ID, VALIDATORS.CORRUPT).isMongoId(),
  check(ACTIVITY_PARAMS.ICON, VALIDATORS.REQUIRED).not().isEmpty(),
  check(ACTIVITY_PARAMS.TITLE, VALIDATORS.REQUIRED).not().isEmpty(),
  check(ACTIVITY_PARAMS.START_TIME, VALIDATORS.REQUIRED).not().isEmpty(),
  check(ACTIVITY_PARAMS.DURATION_TIME, VALIDATORS.INVALID).isNumeric(),
  // check(ACTIVITY_PARAMS.ID).custom(isOwner),
  validParams,
  validJWT,
  validActivityOwner
], activityController.updateOne)

router.delete(`/:${ACTIVITY_PARAMS.ID}`, [
  logger,
  check(ACTIVITY_PARAMS.ID, VALIDATORS.CORRUPT).isMongoId(),
  // check(ACTIVITY_PARAMS.ID).custom(isOwner),
  validParams,
  validJWT,
  validActivityOwner
], activityController.deleteOne)

module.exports = router
