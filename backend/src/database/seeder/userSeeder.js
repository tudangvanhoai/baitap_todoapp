import faker from '@faker-js/faker'
import User from '../../models/User'

for (let i = 1; i <= 5; i++) {
  const name = `${faker.fakerVI.person.lastName()} ${faker.fakerVI.person.firstName()}`

  const user = new User({ name })
  await user.save()
}
