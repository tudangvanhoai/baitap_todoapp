import { Schema, model } from 'mongoose'
import { TUser } from '../types'

var userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  tasks: {
    type: [Schema.Types.ObjectId],
    ref: 'task',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User = model<TUser>('user', userSchema)

export default User
