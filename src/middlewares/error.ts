import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express'
import AppError from '../utils/AppError'
import { MongooseError } from 'mongoose'

const handleAppError = (res: Response, err: AppError) => {
  return res.status(err.statusCode).json({ error: err.message })
}

const handleMongoDuplicateFieldsError = (res: Response, err: MongooseError) => {
  const value = err.message.match(/\{([^}]+)\}/)
  const message = `Duplicate field value: ${value}. Please use another value`

  return res.status(400).json({ message })
}

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next(new AppError('This route does not exists', 404))
}

export const globalError: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.name)

  if (err instanceof AppError) {
    handleAppError(res, err)
    return
  }

  if (err.code === 11000) {
    handleMongoDuplicateFieldsError(res, err)
    return
  }
  res.status(500).json({ error: 'Internal Server Error' })
}
