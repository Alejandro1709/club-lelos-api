import type { NextFunction, Request, Response } from 'express'
import Sport from '../models/Sport'

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sports = await Sport.find()

    res.status(200).json(sports)
  } catch (error) {
    next(error)
  }
}
