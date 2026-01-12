import { Router } from 'express'
import { getAll } from '../controllers/sport.controller'

const router: Router = Router()

router.get('/', getAll)

export default router
