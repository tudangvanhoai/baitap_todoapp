import mongoose from 'mongoose'

var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: null,
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null,
  },
  status: {
    type: String,
    enum: ['todo', 'inprogress', 'done'],
    default: 'todo',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Task = mongoose.model('task', schema)

export default Task
