import express from 'express'
import taskController from '../controllers/taskController'

const route = express.Router()

route.get('/', taskController.index)
route.post('/', taskController.create)
route.get('/:id', taskController.show)
route.put('/:id', taskController.update)
route.delete('/:id', taskController.delete)

export default route
