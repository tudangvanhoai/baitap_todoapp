import apiClient from '@/services/api'

const taskService = {
  path: '/tasks',
  async getList(params) {
    const { data } = await apiClient.get(this.path, { params })
    return data
  },
  async create(payloads) {
    const { data } = await apiClient.post(this.path, payloads)
    return data
  },
  async update(id, payloads) {
    const { data } = await apiClient.put(`${this.path}/${id}`, payloads)
    return data
  },
  async delete(id) {
    const { data } = await apiClient.delete(`${this.path}/${id}`)
    return data
  },
}

export default taskService
