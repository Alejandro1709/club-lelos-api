import express, { type Application } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db'
import sportRoutes from './routes/sport.routes'
import { globalError, notFoundError } from './middlewares/error'

dotenv.config()

const app: Application = express()

connectDB()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/sports', sportRoutes)

app.use(notFoundError)

app.use(globalError)

export default app
