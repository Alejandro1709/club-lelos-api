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

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { slug } = req.params

  try {
    const sport = await Sport.findOne({ slug })

    if (!sport) {
      return res.status(404).json({ message: 'This sport does not exists' })
    }

    res.status(200).json(sport)
  } catch (error) {
    next(error)
  }
}
