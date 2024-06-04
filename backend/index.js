const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const multer = require('multer')
const routes = require('./src/routes')
const cors = require('cors')
const connectDB = require('./src/database/connection')

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
