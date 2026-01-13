import { Router } from 'express'
import { createUser, loginUser } from '../controllers/auth.controller'
import { body } from 'express-validator'
import { handleInputErrors } from '../middlewares/validation'

const router: Router = Router()

router.post(
  '/create-account',
  body('name').notEmpty().withMessage('Provide a name'),
  body('email').isEmail().withMessage('Provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Provide a longer password, minimum is 8'),
  handleInputErrors,
  createUser
)

router.post(
  '/login',
  body('email').isEmail().withMessage('Provide a valid email'),
  body('password').notEmpty().withMessage('Provide a password'),
  handleInputErrors,
  loginUser
)

export default router
