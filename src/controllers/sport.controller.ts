import type { NextFunction, Request, Response } from 'express'

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ message: 'Ok' })
  } catch (error) {
    next(error)
  }
}
