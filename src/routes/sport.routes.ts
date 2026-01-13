import { Router } from 'express'
import {
  createSport,
  deleteSport,
  getAll,
  getOne,
  updateSport,
} from '../controllers/sport.controller'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middlewares/validation'

const router: Router = Router()

router.get('/', getAll)

router.get(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Sport Id'),
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
  body('category')
    .isMongoId()
    .withMessage('The category must be a valid MongoID')
    .notEmpty()
    .withMessage('The category cannot be empty'),
  handleInputErrors,
  createSport
)

router.patch(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Sport Id'),
  handleInputErrors,
  updateSport
)

router.delete(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Sport Id'),
  handleInputErrors,
  deleteSport
)

export default router
