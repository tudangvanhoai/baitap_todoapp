import Joi from 'joi'

const taskValidation = {
  create: {
    body: Joi.object()
      .keys({
        title: Joi.string().required(),
      })
      .unknown(),
  },

  update: {
    body: Joi.object()
      .keys({
        title: Joi.string().required(),
        assignee: Joi.when('status', {
          is: Joi.valid('todo'),
          then: Joi.optional(),
          otherwise: Joi.string()
            .required()
            .messages({ 'string.base': '"assignee" is not allowed to be empty' }),
        }),
        status: Joi.string().required().valid('todo', 'inprogress', 'done'),
      })
      .unknown(),
  },
}

export default taskValidation
