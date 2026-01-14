import express, { type Application } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import connectDB from './config/db'
import authRoutes from './routes/auth.routes'
import sportRoutes from './routes/sport.routes'
import categoriesRoutes from './routes/category.routes'
import reservationsRoutes from './routes/reservation.routes'
import eventsRoutes from './routes/event.routes'
import { globalError, notFoundError } from './middlewares/error'
import { corsConfig } from './config/cors'

dotenv.config()

const app: Application = express()

connectDB()

app.use(express.json())
app.use(cors(corsConfig))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/sports', sportRoutes)
app.use('/api/v1/categories', categoriesRoutes)
app.use('/api/v1/events', eventsRoutes)
app.use('/api/v1/reservations', reservationsRoutes)

app.use(notFoundError)

app.use(globalError)

export default app
