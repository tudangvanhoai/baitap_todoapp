const User = require('../models/User')

exports.addTask = async (id, task, session) => {
  if (!id) return

  const user = await User.findById(id)

  if (!user) {
    throw new Error('User not found')
  }

  user.tasks.push(task)
  await user.save({ session })
}

exports.removeTask = async (id, task, session) => {
  if (!id) return

  const user = await User.findById(id)

  if (!user) {
    throw new Error('User not found')
  }

  user.tasks.pull(task)
  await user.save({ session })
}
