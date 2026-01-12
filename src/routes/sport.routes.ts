import { Router } from 'express'
import { createSport, getAll, getOne } from '../controllers/sport.controller'
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

export default router
