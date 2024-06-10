import express from 'express'
import taskRoutes from './taskRoutes'
import userRoutes from './userRoutes'

const routes = express.Router()

routes.use('/tasks', taskRoutes)
routes.use('/users', userRoutes)

export default routes
