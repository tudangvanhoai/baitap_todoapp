import dotenv from 'dotenv'
import connectDB from '../connection'
import taskSeed from './taskSeeder'
import userSeed from './userSeeder'

dotenv.config({ path: '.env' })

const dbSeed = async () => {
  await connectDB()

  await userSeed()
  await taskSeed()

  process.exit(1)
}

dbSeed()
