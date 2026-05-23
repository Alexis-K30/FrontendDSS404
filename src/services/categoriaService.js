import apiClient from './api'

export const categoriaService = {
  getAll: async () => {
    const response = await apiClient.get('/categorias', { params: { per_page: 100 } })
    return response.data.data ?? []
  },
}