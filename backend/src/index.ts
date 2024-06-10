import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'
import routes from './routes'
import connectDB from './database/connection'

const app = express()
const upload = multer()

app.use(cors())

// Load environment variables from .env file
dotenv.config({ path: '.env' })

// Log HTTP requests
app.use(morgan('tiny'))

// Connect to MongoDB
connectDB()

// Parse incoming JSON and URL-encoded data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Handle multipart/form-data
app.use(upload.none())

// Load routes
app.use('/', routes)

// Start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
