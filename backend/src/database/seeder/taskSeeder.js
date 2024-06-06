import faker from '@faker-js/faker'
import User from '../../models/User'
import Task from '../../models/Task'

const getRandomUser = async () => {
  const count = await User.countDocuments()
  const random = Math.floor(Math.random() * count)
  return await User.findOne().skip(random)
}

const getRandomStatus = () => {
  const statuses = ['todo', 'inprogress', 'done']
  const randomIndex = Math.floor(Math.random() * statuses.length)
  return statuses[randomIndex]
}

for (let i = 1; i <= 50; i++) {
  const title = faker.fakerVI.lorem.sentence()
  const content = faker.fakerVI.lorem.paragraph()
  const status = getRandomStatus()
  const isAssignee = Math.floor(Math.random() * 2)
  const assignee = isAssignee ? await getRandomUser() : null

  const task = new Task({ title, content, assignee: assignee && assignee._id, status })
  await task.save()

  if (assignee) {
    assignee.tasks.push(task._id)
    await assignee.save()
  }
}
