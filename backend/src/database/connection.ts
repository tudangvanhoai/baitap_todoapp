import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI

    if (!mongoUri) {
      throw new Error('Missing environment variables: MONGO_URI and/or MONGO_DB_NAME')
    }

    const connect = await mongoose.connect(mongoUri)

    console.log(`MongoDB connected: ${connect.connection.host}`)
  } catch (err: any) {
    console.error(`Error: ${err?.message || err}`)
    process.exit(1)
  }
}

export default connectDB
