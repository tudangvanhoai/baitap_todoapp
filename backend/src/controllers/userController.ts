import { Request, Response } from 'express'
import httpStatus from 'http-status'
import userService from '../services/userService'

const userController = {
  async index(req: Request, res: Response) {
    try {
      const data = await userService.getAll()

      return res.json(data)
    } catch (err: any) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: err?.message || 'An unknown error occurred',
      })
    }
  },
}

export default userController
