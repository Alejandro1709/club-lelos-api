import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import AppError from '../utils/AppError'
import User, { type IUser } from '../models/User'

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    return next(new AppError('Not Authorized', 401))
  }

  const token = bearer.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (typeof decoded === 'object' && decoded.id) {
      const user = await User.findById(decoded.id).select('_id name email')

      if (user) {
        req.user = user

        next()
      } else {
        return next(new AppError('Invalid Token', 401))
      }
    }
  } catch (error) {
    next(error)
  }
}
