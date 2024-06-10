import { ObjectSchema } from 'joi'
import { Document, Schema } from 'mongoose'
import { ValidationSchemaKey } from '../config/define'

export * from './user'
export * from './task'

export type TModel<T> = Document<unknown, {}, T> &
  T &
  Required<{
    _id: Schema.Types.ObjectId | null
  }>

export type TValidationSchema = {
  [key in ValidationSchemaKey]?: ObjectSchema<any>
}
