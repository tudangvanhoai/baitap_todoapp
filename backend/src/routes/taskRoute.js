const express = require('express')
const route = express.Router()

const taskController = require('../controllers/taskController')

route.get('/', taskController.index)
route.post('/', taskController.create)
route.get('/:id', taskController.show)
route.put('/:id', taskController.update)
route.delete('/:id', taskController.delete)

module.exports = route
