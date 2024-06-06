import express from 'express'
import userController from '../controllers/userController'

const route = express.Router()

route.get('/', userController.index)

export default route
