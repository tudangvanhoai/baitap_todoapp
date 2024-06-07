import Joi from 'joi'
import httpStatus from 'http-status'
import pick from '../utils/pick'

const validate = schema => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body'])
  const object = pick(req, Object.keys(validSchema))
  const { error, value } = Joi.object(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object)

  if (error) {
    const errorMessages = error.details.map(details => details.message)
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: errorMessages })
  }

  Object.assign(req, value)
  next()
}

export default validate
