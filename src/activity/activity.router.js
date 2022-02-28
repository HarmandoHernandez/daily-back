// @ts-check

const { Router } = require('express')
const { check } = require('express-validator')
const ActivityController = require('./activity.controller')

const {
  validParams,
  logger
} = require('../shared/middlewares')
const ACTIVITY_PARAMS = require('./activity.enum')
const VALIDATORS = require('../shared/enums/validators.enum')

const router = Router()
const activityController = new ActivityController()

router.post('/:user', [
  logger,
  check(ACTIVITY_PARAMS.USER, VALIDATORS.CORRUPT).isMongoId(),
  check(ACTIVITY_PARAMS.ICON, VALIDATORS.REQUIRED).not().isEmpty(),
  check(ACTIVITY_PARAMS.TITLE, VALIDATORS.REQUIRED).not().isEmpty(),
  check(ACTIVITY_PARAMS.START_TIME, VALIDATORS.REQUIRED).not().isEmpty(), // TODO: Validar formato: "XX:XX"
  check(ACTIVITY_PARAMS.DURATION_TIME, VALIDATORS.INVALID).isNumeric(),
  validParams
], activityController.createOne)

router.get('/:user/:id', [
  logger,
  check(ACTIVITY_PARAMS.USER, VALIDATORS.CORRUPT).isMongoId(),
  check(ACTIVITY_PARAMS.ID, VALIDATORS.CORRUPT).isMongoId(),
  validParams
], activityController.getOneById)

router.patch('/:user/:id', [
  logger,
  check(ACTIVITY_PARAMS.USER, VALIDATORS.CORRUPT).isMongoId(),
  check(ACTIVITY_PARAMS.ID, VALIDATORS.CORRUPT).isMongoId(),
  check(ACTIVITY_PARAMS.ICON, VALIDATORS.REQUIRED).not().isEmpty(),
  check(ACTIVITY_PARAMS.TITLE, VALIDATORS.REQUIRED).not().isEmpty(),
  check(ACTIVITY_PARAMS.START_TIME, VALIDATORS.REQUIRED).not().isEmpty(),
  check(ACTIVITY_PARAMS.DURATION_TIME, VALIDATORS.INVALID).isNumeric(),
  // check(ACTIVITY_PARAMS.ID).custom(isOwner),
  validParams
], activityController.updateOne)

router.delete('/:user/:id', [
  logger,
  check(ACTIVITY_PARAMS.USER, VALIDATORS.CORRUPT).isMongoId(),
  check(ACTIVITY_PARAMS.ID, VALIDATORS.CORRUPT).isMongoId(),
  // check(ACTIVITY_PARAMS.ID).custom(isOwner),
  validParams
], activityController.deleteOne)

module.exports = router
