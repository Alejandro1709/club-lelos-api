import mongoose, { Document, PopulatedDoc, Schema, Types } from 'mongoose'
import type { ISport } from './Sport'

export interface IEvent extends Document {
  title: string
  description: string
  sport: PopulatedDoc<ISport | Document>
  price: number
  location: string
  maxPersonCount: number
  startDate: Date
  endDate: Date
  isActive: boolean
  isAvailable: boolean
  status: string
}

const eventSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    sport: {
      type: Types.ObjectId,
      ref: 'Sport',
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    maxPersonCount: {
      type: Number,
      required: true,
      default: 1,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['DRAFT', 'ACTIVE', 'CANCELLED', 'FINISHED'],
      default: 'DRAFT',
    },
  },
  {
    timestamps: true,
  }
)

const Event = mongoose.model<IEvent>('Event', eventSchema)

export default Event
