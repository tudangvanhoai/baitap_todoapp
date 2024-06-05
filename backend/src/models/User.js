const mongoose = require('mongoose')

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'task',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('user', schema)

module.exports = User
