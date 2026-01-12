import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express'

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(404).json({ message: 'This route does not exists' })
}

export const globalError: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.name)

  res.status(500).json({ error: 'Internal Server Error' })
}
