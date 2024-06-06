import mongoose from 'mongoose'
import taskService from '../services/taskService'
import userService from '../services/userService'

const taskController = {
  index: async (req, res) => {
    try {
      const data = await taskService.getList(req)

      return res.json(data)
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      })
    }
  },

  create: async (req, res) => {
    // Start a transaction
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      // Create task
      const task = await taskService.create(req, session)

      // Add task to user
      await userService.addTask(task.assignee, task._id, session)

      // Commit the transaction
      await session.commitTransaction()
      session.endSession()

      return res.json(task)
    } catch (err) {
      // Abort the transaction
      await session.abortTransaction()
      session.endSession()

      return res.status(400).json({
        message: err.message,
      })
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params
      const task = await taskService.getById(id)

      return res.json(task)
    } catch (err) {
      res.status(404).json({
        message: err.message,
      })
    }
  },

  update: async (req, res) => {
    // Start a transaction
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      const { id } = req.params
      const task = await taskService.getById(id)

      const oldAssigneeId = task.assignee
      const newAssigneeId = req.body.assignee

      // Update task
      await taskService.update(task, req, session)

      // Update task in user
      if (oldAssigneeId?.toString() != newAssigneeId) {
        await userService.removeTask(oldAssigneeId, task._id, session)
        await userService.addTask(newAssigneeId, task._id, session)
      }

      // Commit the transaction
      await session.commitTransaction()
      session.endSession()

      return res.json()
    } catch (err) {
      // Abort the transaction
      await session.abortTransaction()
      session.endSession()

      return res.status(404).json({
        message: err.message,
      })
    }
  },

  delete: async (req, res) => {
    // Start a transaction
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      const { id } = req.params
      const task = await taskService.getById(id)

      // Delete task
      await taskService.deleteById(id, session)

      // Remove task in user
      await userService.removeTask(task.assignee, task._id, session)

      // Commit the transaction
      await session.commitTransaction()
      session.endSession()

      res.json()
    } catch (err) {
      // Abort the transaction
      await session.abortTransaction()
      session.endSession()

      res.status(404).json({
        message: err.message,
      })
    }
  },
}

export default taskController
