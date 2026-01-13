import type { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import AppError from '../utils/AppError'
import { checkPassword, hashPassword } from '../utils/auth'
import { generateJWT } from '../utils/jwt'

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  try {
    const userExists = await User.findOne({ email })

    if (userExists) {
      return next(new AppError('Email already in use', 409))
    }

    const user = new User(req.body)

    user.password = await hashPassword(password)

    await user.save()

    res.status(201).json({ message: 'User created' })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return next(new AppError('Invalid credentials', 401))
    }

    const isPasswordCorrect = await checkPassword(password, user.password)

    if (!isPasswordCorrect) {
      return next(new AppError('Invalid Credentials', 401))
    }

    const token = generateJWT({ id: user._id })

    res.status(200).json({ token })
  } catch (error) {
    next(error)
  }
}
