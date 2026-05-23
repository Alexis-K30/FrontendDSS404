import apiClient from './api'

export const productoService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/productos', { params })
    return response.data
  },

  getOne: async (id) => {
    const response = await apiClient.get(`/productos/${id}`)
    return response.data.data
  },

  create: async (formData) => {
    const response = await apiClient.post('/productos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data.data
  },

  update: async (id, formData) => {
    const response = await apiClient.post(`/productos/${id}?_method=PUT`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data.data
  },

  destroy: async (id) => {
    await apiClient.delete(`/productos/${id}`)
  },
}