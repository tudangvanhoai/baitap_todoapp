import { Schema, model } from 'mongoose'
import { TTask } from '../types'
import { TaskStatus } from '../config/define'

var taskSchema = new Schema<TTask>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: null,
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    default: null,
  },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.Todo,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Task = model<TTask>('task', taskSchema)

export default Task
