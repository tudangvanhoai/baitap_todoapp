import { fakerVI } from '@faker-js/faker'
import User from '../../models/User'

const userSeed = async () => {
  try {
    console.log('Start seeding users')

    await User.deleteMany()

    const data = [{ name: 'Đặng Văn Hoài Tú' }]
    for (let i = 0; i < 4; i++) {
      data.push({
        name: `${fakerVI.person.lastName()} ${fakerVI.person.firstName()}`,
      })
    }

    await User.insertMany(data)

    console.log('Seeding users success')
  } catch (err) {
    console.error('Seeding users error:', err)
  }
}

export default userSeed
