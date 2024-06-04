const express = require('express')
const route = express.Router()

const taskRoute = require('./taskRoute')
const userRoute = require('./userRoute')

route.use('/tasks', taskRoute)
route.use('/users', userRoute)

module.exports = route
