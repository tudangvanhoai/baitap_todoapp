import User from '../models/User'

const userController = {
  index: async (req, res) => {
    const users = await User.find()

    res.json({
      data: users,
    })
  },
}

export default userController
