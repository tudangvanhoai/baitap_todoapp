import { Request } from 'express'
import { Schema, mongo } from 'mongoose'
import Task from '../models/Task'
import { PAGINATION } from '../config/define'
import { TModel, TTask } from '../types'

const taskService = {
  async getList(req: Request) {
    const currentPage = parseInt((req?.query?.page as string) || '') || 1
    const { q, searchAssignee, searchStatus } = req.query
    const limit = PAGINATION.LIMIT

    // Search and filter
    const query: any = {}
    if (q) {
      const regex = new RegExp(q as string, 'i')
      query.$or = [{ title: { $regex: regex } }, { content: { $regex: regex } }]
    }
    if (searchAssignee) {
      query.assignee = searchAssignee === 'no-assign' ? null : searchAssignee
    }
    if (searchStatus) {
      query.status = searchStatus
    }

    // Calc pagination
    const totalTasks = await Task.countDocuments(query)
    const totalPages = Math.ceil(totalTasks / limit)

    // Get tasks
    const tasks = await Task.find(query)
      .select('_id title content status createdAt')
      .sort({ createdAt: 'desc' })
      .populate('assignee', '_id name')
      .skip((currentPage - 1) * limit)
      .limit(limit)

    return {
      data: tasks,
      meta: {
        current_page: currentPage,
        last_page: totalPages,
        per_page: limit,
        from: (currentPage - 1) * limit + 1,
        to: currentPage * limit < totalTasks ? currentPage * limit : totalTasks,
        total: totalTasks,
      },
    }
  },

  async create(req: Request, session: mongo.ClientSession) {
    const { title, content, assignee, status } = req.body

    const task = new Task({ title, content, assignee, status })
    await task.save({ session })

    return task
  },

  async getById(id: Schema.Types.ObjectId | string) {
    const task = await Task.findById(id)
      .select('_id title content status createdAt')
      .populate('assignee', '_id name')

    if (!task) {
      throw new Error('Task not found')
    }

    return task
  },

  async findById(id: Schema.Types.ObjectId | string) {
    const task = await Task.findById(id)

    if (!task) {
      throw new Error('Task not found')
    }

    return task
  },

  async update(req: Request, task: TModel<TTask>, session: mongo.ClientSession) {
    const { title, content, assignee, status } = req.body

    task.title = title
    task.content = content
    task.assignee = assignee
    task.status = status
    await task.save({ session })
  },

  async delete(id: Schema.Types.ObjectId | string, session: mongo.ClientSession) {
    await Task.deleteOne({ _id: id }, { session })
  },
}

export default taskService
