import express from 'express'
import validate from '../middlewares/validate'
import taskValidation from '../validations/taskValidation'
import taskController from '../controllers/taskController'

const route = express.Router()

route.get('/', taskController.index)
route.post('/', validate(taskValidation.create), taskController.create)
route.get('/:id', taskController.show)
route.put('/:id', validate(taskValidation.update), taskController.update)
route.delete('/:id', taskController.delete)

export default route
