const Task = require('../models/Task')
const define = require('../config/define')

exports.getList = async req => {
  const currentPage = parseInt(req.query.page) || 1
  const { q, searchAssignee, searchStatus } = req.query
  const limit = define.PAGINATION.LIMIT

  // Search and filter
  const query = {}
  if (q) {
    const regex = new RegExp(q, 'i')
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
    .sort({ createdAt: 'desc' })
    .populate('assignee')
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
}

exports.create = async (req, session) => {
  const { title, content, assignee, status } = req.body

  const task = new Task({ title, content, assignee, status })
  await task.save({ session })

  return task
}

exports.getById = async id => {
  const task = await Task.findById(id)

  if (!task) {
    throw new Error('Task not found')
  }

  return task
}

exports.update = async (task, req, session) => {
  const { title, content, assignee, status } = req.body

  task.title = title
  task.content = content
  task.assignee = assignee
  task.status = status
  await task.save({ session })
}

exports.deleteById = async (id, session) => {
  await Task.deleteOne({ _id: id }, { session })
}
