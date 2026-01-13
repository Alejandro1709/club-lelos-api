import mongoose, { Schema, Document, PopulatedDoc, Types } from 'mongoose'
import type { IReservation } from './Reservation'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  confirmed: boolean
  role: string
  reservations?: PopulatedDoc<IReservation & Document>[]
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    reservations: [
      {
        type: Types.ObjectId,
        ref: 'Reservation',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model<IUser>('User', userSchema)

export default User
