import { Router } from 'express'
import { getAll, getOne } from '../controllers/sport.controller'

const router: Router = Router()

router.get('/', getAll)

router.get('/:slug', getOne)

export default router
