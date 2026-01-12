import { Router } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middlewares/validation'
import {
  createCategory,
  getAll,
  getOne,
} from '../controllers/category.controller'

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
  body('name').isString().notEmpty().withMessage('The title cannot be empty'),
  handleInputErrors,
  createCategory
)

export default router
