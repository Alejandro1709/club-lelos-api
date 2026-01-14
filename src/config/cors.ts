import { CorsOptions } from 'cors'
import AppError from '../utils/AppError'

export const corsConfig: CorsOptions = {
  origin: function (origin, cb) {
    const whitelist = [process.env.FRONTEND_URL]

    if (process.argv[2] === '--api') {
      whitelist.push(undefined)
    }

    if (whitelist.includes(origin)) {
      cb(null, true)
    } else {
      cb(new AppError('CORS Error', 400))
    }
  },
}
