const mongoose = require('mongoose')

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
  created_at: {
    type: Date,
    default: Date.now,
  },
})

const Task = mongoose.model('task', schema)

module.exports = Task
