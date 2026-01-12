import mongoose, { Document, PopulatedDoc, Schema, Types } from 'mongoose'
import type { ICategory } from './Category'

export interface ISport extends Document {
  id: string
  title: string
  slug?: string
  description: string
  category: PopulatedDoc<ICategory & Document>
}

const sportSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  }
)

const Sport = mongoose.model<ISport>('Sport', sportSchema)
