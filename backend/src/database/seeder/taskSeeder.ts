import { fakerVI } from '@faker-js/faker'
import User from '../../models/User'
import Task from '../../models/Task'
import { TaskStatus } from '../../config/define'

const getRandomUser = async () => {
  const count = await User.countDocuments()
  const random = Math.floor(Math.random() * count)
  return await User.findOne().skip(random)
}

const getRandomStatus = () => {
  const statuses = Object.values(TaskStatus)
  const randomIndex = Math.floor(Math.random() * statuses.length)
  return statuses[randomIndex]
}

const taskSeed = async () => {
  try {
    console.log('Start seeding tasks')

    await Task.deleteMany()
    await User.updateMany({ tasks: [] })

    const tasksPromises: any = []

    for (let i = 0; i < 100; i++) {
      const title = fakerVI.lorem.sentence()
      const content = fakerVI.lorem.paragraph()
      const status = getRandomStatus()

      const assignee =
        status === TaskStatus.Todo
          ? Math.random() < 0.5
            ? await getRandomUser()
            : null
          : await getRandomUser()

      const task = new Task({ title, content, assignee: assignee ? assignee._id : null, status })
      tasksPromises.push(
        task.save().then(async savedTask => {
          if (assignee && savedTask._id) {
            assignee?.tasks?.push(savedTask._id)
            await assignee.save()
          }
        }),
      )
    }

    await Promise.all(tasksPromises)
    console.log('Seeding tasks success')
  } catch (err: any) {
    console.error('Seeding tasks error:', err)
  }
}

export default taskSeed
