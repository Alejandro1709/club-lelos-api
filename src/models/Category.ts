import mongoose, { Document, Schema } from 'mongoose'

export interface ICategory extends Document {
  id: string
  name: string
  isActive: boolean
}

const categorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Category = mongoose.model<ICategory>('Category', categorySchema)

export default Category
