import { mongo, Schema } from 'mongoose'
import User from '../models/User'

const userService = {
  async getAll() {
    return await User.find().select('_id name')
  },

  async findById(id: Schema.Types.ObjectId | string) {
    const user = await User.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  },

  async addTask(
    id: Schema.Types.ObjectId | null,
    taskId: Schema.Types.ObjectId | null,
    session: mongo.ClientSession,
  ) {
    if (!id) return

    if (!taskId) {
      throw new Error('Task id is required')
    }

    const user = await this.findById(id)

    user?.tasks?.push(taskId)
    await user.save({ session })
  },

  async removeTask(
    id: Schema.Types.ObjectId | null,
    taskId: Schema.Types.ObjectId | null,
    session: mongo.ClientSession,
  ) {
    if (!id) return

    if (!taskId) {
      throw new Error('Task id is required')
    }

    const user = await this.findById(id)

    user.tasks = user?.tasks?.filter(id => id.toString() !== taskId.toString()) || []

    await user.save({ session })
  },
}

export default userService
