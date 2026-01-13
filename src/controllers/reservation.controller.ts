import type { NextFunction, Request, Response } from 'express'
import Reservation from '../models/Reservation'
import AppError from '../utils/AppError'
import User from '../models/User'

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservations = await Reservation.find()
      .populate('event')
      .populate('user', 'id name email')

    res.status(200).json(reservations)
  } catch (error) {
    next(error)
  }
}

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('event')
      .populate('user', 'id name email')

    if (!reservation) {
      return next(new AppError('Reservation not found', 404))
    }

    res.status(200).json(reservation)
  } catch (error) {
    next(error)
  }
}

export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservation = new Reservation(req.body)

    const user = await User.findById(req.user._id)

    reservation.user = req.user

    user.reservations.push(reservation)

    await Promise.allSettled([reservation.save(), user.save()])

    res.status(201).json({ message: 'Reservation created!' })
  } catch (error) {
    next(error)
  }
}
