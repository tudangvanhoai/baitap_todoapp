import { Document, Schema } from 'mongoose'
import { TaskStatus } from '../config/define'
import { TUser } from './user'
import { TModel } from '.'

export type TTask = {
  _id: Schema.Types.ObjectId | null
  title: string | null
  content: string | null
  assignee: Schema.Types.ObjectId | null
  status?: TaskStatus | null
  createdAt: Date | null
} & Document
