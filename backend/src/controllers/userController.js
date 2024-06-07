import userService from '../services/userService'

exports.index = async (req, res) => {
  try {
    const data = await userService.getAll()

    return res.json(data)
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: err.message,
    })
  }
}
