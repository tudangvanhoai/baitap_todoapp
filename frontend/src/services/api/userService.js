import apiClient from '@/services/api'

const userService = {
  path: '/users',
  async getAll() {
    const { data } = await apiClient.get(this.path)
    return data
  },
}

export default userService
