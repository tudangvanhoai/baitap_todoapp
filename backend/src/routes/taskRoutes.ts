import express from 'express'
import validate from '../middlewares/validate'
import taskValidation from '../validations/taskValidation'
import taskController from '../controllers/taskController'

const taskRoutes = express.Router()

taskRoutes.get('/', taskController.index)
taskRoutes.post('/', validate(taskValidation.create), taskController.create)
taskRoutes.get('/:id', taskController.show)
taskRoutes.put('/:id', validate(taskValidation.update), taskController.update)
taskRoutes.delete('/:id', taskController.delete)

export default taskRoutes
