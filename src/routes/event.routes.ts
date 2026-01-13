import { Router } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middlewares/validation'
import {
  createEvent,
  deleteEvent,
  getAll,
  getOne,
  updateEvent,
} from '../controllers/event.controller'

const router: Router = Router()

router.get('/', getAll)

router.get(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Event Id'),
  handleInputErrors,
  getOne
)

router.post(
  '/',
  body('title').isString().notEmpty().withMessage('The title cannot be empty'),
  body('description')
    .isString()
    .notEmpty()
    .withMessage('The description cannot be empty'),
  body('sport').isMongoId().withMessage('Sport field must be a valid mongoID'),
  body('price').isFloat({ min: 0 }).withMessage('The price must be positive'),
  body('location')
    .isString()
    .notEmpty()
    .withMessage('The location cannot be empty'),
  body('maxPersonCount')
    .isInt({ min: 1 })
    .withMessage('maxPersonCount must be 1 or greater than 1'),
  body('startDate')
    .isISO8601()
    .toDate()
    .withMessage('startDate must be a valid date'),
  body('endDate')
    .isISO8601()
    .toDate()
    .withMessage('endDate must be a valid date'),
  handleInputErrors,
  createEvent
)

router.patch(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Event Id'),
  body('title').isString().notEmpty().withMessage('The title cannot be empty'),
  body('description')
    .isString()
    .notEmpty()
    .withMessage('The description cannot be empty'),
  body('sport').isMongoId().withMessage('Sport field must be a valid mongoID'),
  body('price').isFloat({ min: 0 }).withMessage('The price must be positive'),
  body('location')
    .isString()
    .notEmpty()
    .withMessage('The location cannot be empty'),
  body('maxPersonCount')
    .isInt({ min: 1 })
    .withMessage('maxPersonCount must be 1 or greater than 1'),
  body('startDate')
    .isISO8601()
    .toDate()
    .withMessage('startDate must be a valid date'),
  body('endDate')
    .isISO8601()
    .toDate()
    .withMessage('endDate must be a valid date'),
  handleInputErrors,
  updateEvent
)

router.delete(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Event Id'),
  deleteEvent
)

export default router
