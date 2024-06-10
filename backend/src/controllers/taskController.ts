import { Request, Response } from 'express'
import mongoose from 'mongoose'
import httpStatus from 'http-status'
import taskService from '../services/taskService'
import userService from '../services/userService'

const taskController = {
  async index(req: Request, res: Response) {
    try {
      const tasks = await taskService.getList(req)

      return res.json(tasks)
    } catch (err: any) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: err?.message || 'An unknown error occurred',
      })
    }
  },

  async create(req: Request, res: Response) {
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

      return res.status(httpStatus.CREATED).json(task)
    } catch (err: any) {
      // Abort the transaction
      await session.abortTransaction()
      session.endSession()

      return res.status(httpStatus.BAD_REQUEST).json({
        message: err?.message || 'An unknown error occurred',
      })
    }
  },

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params
      const task = await taskService.getById(id)

      return res.json(task)
    } catch (err: any) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: err?.message || 'An unknown error occurred',
      })
    }
  },

  async update(req: Request, res: Response) {
    // Start a transaction
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      const { id } = req.params
      const task = await taskService.findById(id)

      const oldAssigneeId = task.assignee
      const newAssigneeId = req.body.assignee

      // Update task
      await taskService.update(req, task, session)

      // Update task in user
      if (oldAssigneeId?.toString() != newAssigneeId) {
        await userService.removeTask(oldAssigneeId, task._id, session)
        await userService.addTask(newAssigneeId, task._id, session)
      }

      // Commit the transaction
      await session.commitTransaction()
      session.endSession()

      return res.json()
    } catch (err: any) {
      // Abort the transaction
      await session.abortTransaction()
      session.endSession()

      return res.status(httpStatus.BAD_REQUEST).json({
        message: err?.message || 'An unknown error occurred',
      })
    }
  },

  async delete(req: Request, res: Response) {
    // Start a transaction
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      const { id } = req.params
      const task = await taskService.findById(id)

      // Delete task
      await taskService.delete(id, session)

      // Remove task in user
      await userService.removeTask(task.assignee, task._id, session)

      // Commit the transaction
      await session.commitTransaction()
      session.endSession()

      res.json()
    } catch (err: any) {
      // Abort the transaction
      await session.abortTransaction()
      session.endSession()

      return res.status(httpStatus.BAD_REQUEST).json({
        message: err?.message || 'An unknown error occurred',
      })
    }
  },
}

export default taskController
