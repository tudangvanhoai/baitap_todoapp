import { Document, Schema } from 'mongoose'

export type TUser = {
  _id: Schema.Types.ObjectId | null
  name: string | null
  tasks: Schema.Types.ObjectId[] | null
  createdAt?: string | null
} & Document
