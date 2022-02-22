const { Router } = require('express')
const { check } = require('express-validator')
// Customs
const { validParams, logger } = require('../shared/middlewares')
const { VALIDATORS } = require('../shared/enums')
const USER_PARAMS = require('./user.enum')
const UserController = require('./user.controller')
// Instances
const router = Router()
const userController = new UserController()

// Routes
router.get('/:id', [
  logger,
  check(USER_PARAMS.ID, VALIDATORS.CORRUPT).isMongoId(),
  validParams
], userController.getById)

module.exports = router
