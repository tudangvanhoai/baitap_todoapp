const Task = require('../models/Task')
const define = require('../config/define')

exports.index = async (req, res) => {
  const currentPage = parseInt(req.query.page) || 1
  const { q, searchAssignee, searchStatus } = req.query
  const limit = define.PAGINATION.LIMIT

  const query = {}
  if (q) {
    query.$or = [
      { title: { $regex: new RegExp(q, 'i') } },
      { content: { $regex: new RegExp(q, 'i') } },
    ]
  }
  if (searchAssignee) {
    query.assignee = searchAssignee == 'no-assign' ? null : searchAssignee
  }
  if (searchStatus) {
    query.status = searchStatus
  }

  const totalTasks = await Task.countDocuments(query)
  const totalPages = Math.ceil(totalTasks / limit)

  const tasks = await Task.find(query)
    .sort({ created_at: 'desc' })
    .populate('assignee')
    .skip((currentPage - 1) * limit)
    .limit(limit)

  res.json({
    data: tasks,
    meta: {
      current_page: currentPage,
      last_page: totalPages,
      per_page: limit,
      from: (currentPage - 1) * limit + 1,
      to: currentPage * limit < totalTasks ? currentPage * limit : totalTasks,
      total: totalTasks,
    },
  })
}

exports.create = async (req, res) => {
  const { title, content, assignee, status } = req.body

  try {
    const task = new Task({ title, content, assignee, status })
    await task.save()

    res.status(201).json({
      data: task,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message || 'An error occurred while creating the task. Please try again.',
    })
  }
}

exports.show = async (req, res) => {
  const { id } = req.params

  try {
    const task = await Task.findById(id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({
      data: task,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message || 'An error occurred while fetching the task. Please try again.',
    })
  }
}

exports.update = async (req, res) => {
  const { id } = req.params
  const { title, content, assignee, status } = req.body

  try {
    const task = await Task.findById(id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    task.title = title
    task.content = content
    task.assignee = assignee
    task.status = status

    await task.save()

    res.json()
  } catch (err) {
    res.status(500).json({
      message: err.message || 'An error occurred while updating the task. Please try again.',
    })
  }
}

exports.delete = async (req, res) => {
  const { id } = req.params

  try {
    await Task.deleteOne({ _id: id })

    res.json()
  } catch (err) {
    res.status(500).json({
      message: err.message || 'An error occurred while deleting the task. Please try again.',
    })
  }
}
