import mongoose, { Schema, Document, PopulatedDoc, Types } from 'mongoose'
import type { IUser } from './User'
import type { IEvent } from './Event'

export interface IReservation extends Document {
  user: PopulatedDoc<IUser | Document>
  event: PopulatedDoc<IEvent | Document>
  status: string
  expiresAt?: Date
}

const reservationSchema: Schema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      enum: ['CONFIRMED', 'CANCELLED'],
      default: 'CONFIRMED',
    },
    expiresAt: {
      type: Date,
      default: Date.now(),
      expires: '10m',
    },
  },
  {
    timestamps: true,
  }
)

const Reservation = mongoose.model<IReservation>(
  'Reservation',
  reservationSchema
)

export default Reservation
