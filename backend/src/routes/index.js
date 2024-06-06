import express from 'express'
import taskRoute from './taskRoute'
import userRoute from './userRoute'

const route = express.Router()

route.use('/tasks', taskRoute)
route.use('/users', userRoute)

export default route
