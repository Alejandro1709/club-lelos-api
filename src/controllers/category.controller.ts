import type { NextFunction, Request, Response } from 'express'
import Category from '../models/Category'

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find()

    res.status(200).json(categories)
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
    const category = await Category.findById(req.params.id)

    if (!category) {
      return res.status(404).json({ message: 'This category does not exists' })
    }

    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
}

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const category = new Category(req.body)

  try {
    await category.save()

    res.status(201).json({ message: 'Category Created!' })
  } catch (error) {
    next(error)
  }
}

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.findById(req.params.id)

    if (!category) {
      return res.status(404).json({ message: 'This category does not exists' })
    }

    category.name = req.body.name || category.name

    await category.save()

    res.status(200).json({ message: 'Category Updated!' })
  } catch (error) {
    next(error)
  }
}

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.findById(req.params.id)

    if (!category) {
      return res.status(404).json({ message: 'This category does not exists' })
    }

    await category.deleteOne()

    res.status(200).json({ message: 'Category Deleted!' })
  } catch (error) {
    next(error)
  }
}
