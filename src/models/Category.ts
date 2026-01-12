import mongoose, { Document, Schema } from 'mongoose'

export interface ICategory extends Document {
  id: string
  name: string
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
  },
  {
    timestamps: true,
  }
)

const Category = mongoose.model<ICategory>('Category', categorySchema)

export default Category
