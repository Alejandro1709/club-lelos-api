import { Router } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middlewares/validation'
import {
  createReservation,
  getAll,
  getOne,
} from '../controllers/reservation.controller'
import { authenticate, authorize } from '../middlewares/auth'

const router: Router = Router()

router.get('/', authenticate, authorize('user'), getAll)

router.get(
  '/:id',
  param('id').isMongoId().withMessage('Invalid reservation id'),
  handleInputErrors,
  authenticate,
  authorize('user'),
  getOne
)

router.post(
  '/',
  body('event').isMongoId().withMessage('event must be a valid mongo id'),
  handleInputErrors,
  authenticate,
  authorize('user'),
  createReservation
)

export default router
