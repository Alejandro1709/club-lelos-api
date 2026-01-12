import express, { type Application } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db'

dotenv.config()

const app: Application = express()

connectDB()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

export default app
