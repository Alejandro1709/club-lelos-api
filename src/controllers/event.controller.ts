import Event from '../models/Event'
import type { NextFunction, Request, Response } from 'express'

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await Event.find().populate('sport')

    res.status(200).json(events)
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
    const event = await Event.findById(req.params.id).populate('sport')

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.status(200).json(event)
  } catch (error) {
    next(error)
  }
}

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const event = new Event(req.body)

  try {
    await event.save()

    res.status(201).json({ message: 'Event created!' })
  } catch (error) {
    next(error)
  }
}

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    event.title = req.body.title || event.title
    event.description = req.body.description || event.description
    event.sport = req.body.sport || event.sport
    event.price = req.body.price || event.price
    event.location = req.body.location || event.location
    event.maxPersonCount = req.body.maxPersonCount || event.maxPersonCount
    event.startDate = req.body.startDate || event.startDate
    event.endDate = req.body.endDate || event.endDate

    await event.save()

    res.status(200).json({ message: 'Event updated!' })
  } catch (error) {
    next(error)
  }
}

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    await event.deleteOne()

    res.status(200).json({ message: 'Event deleted!' })
  } catch (error) {
    next(error)
  }
}
