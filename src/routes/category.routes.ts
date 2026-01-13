import { Router } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middlewares/validation'
import {
  createCategory,
  deleteCategory,
  getAll,
  getOne,
  updateCategory,
} from '../controllers/category.controller'

const router: Router = Router()

router.get('/', getAll)

router.get(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Category Id'),
  handleInputErrors,
  getOne
)

router.post(
  '/',
  body('name').isString().notEmpty().withMessage('The name cannot be empty'),
  handleInputErrors,
  createCategory
)

router.patch(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Category Id'),
  body('name').isString().notEmpty().withMessage('The name cannot be empty'),
  handleInputErrors,
  updateCategory
)

router.delete(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Category Id'),
  handleInputErrors,
  deleteCategory
)

export default router
