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
import { authenticate, authorize } from '../middlewares/auth'

const router: Router = Router()

router.get('/', authenticate, getAll)

router.get(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Category Id'),
  handleInputErrors,
  authenticate,
  authorize('admin'),
  getOne
)

router.post(
  '/',
  body('name').isString().notEmpty().withMessage('The name cannot be empty'),
  handleInputErrors,
  authenticate,
  authorize('admin'),
  createCategory
)

router.patch(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Category Id'),
  body('name').isString().withMessage('The name cannot be empty').optional(),
  handleInputErrors,
  authenticate,
  authorize('admin'),
  updateCategory
)

router.delete(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Category Id'),
  handleInputErrors,
  authenticate,
  authorize('admin'),
  deleteCategory
)

export default router
