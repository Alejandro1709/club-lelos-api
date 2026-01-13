import type { NextFunction, Request, Response } from 'express'
import Sport from '../models/Sport'

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sports = await Sport.find().populate('category')

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
  const { id } = req.params

  try {
    const sport = await Sport.findById(id).populate('category')

    if (!sport) {
      return res.status(404).json({ message: 'This sport does not exists' })
    }

    res.status(200).json(sport)
  } catch (error) {
    next(error)
  }
}

export const createSport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sport = new Sport(req.body)

  try {
    await sport.save()

    res.status(201).json({ message: 'Sport Created!' })
  } catch (error) {
    next(error)
  }
}

export const updateSport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sport = await Sport.findById(req.params.id)

    if (!sport) {
      return res.status(404).json({ message: 'This sport does not exists' })
    }

    sport.title = req.body.title || sport.title
    sport.description = req.body.description || sport.description
    sport.category = req.body.category || sport.category

    await sport.save()

    res.status(200).json({ message: 'Sport updated!' })
  } catch (error) {
    next(error)
  }
}

export const deleteSport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sport = await Sport.findById(req.params.id)

    if (!sport) {
      return res.status(404).json({ message: 'This sport does not exists' })
    }

    await sport.deleteOne()

    res.status(200).json({ message: 'Sport deleted!' })
  } catch (error) {
    next(error)
  }
}
