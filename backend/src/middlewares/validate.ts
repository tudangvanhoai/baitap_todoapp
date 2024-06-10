import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import httpStatus from 'http-status'
import pick from '../utils/pick'
import { TValidationSchema } from '../types'
import { ValidationSchemaKey } from '../config/define'

const validate =
  (schema: TValidationSchema) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, Object.values(ValidationSchemaKey))
    const object = pick(req, Object.keys(validSchema) as ValidationSchemaKey[])
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
