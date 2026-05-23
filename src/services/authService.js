import apiClient from './api'

export const authService = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password })
    return response.data.data
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData)
    return response.data.data
  },

  logout: async () => {
    await apiClient.post('/auth/logout')
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/me')
    return response.data.data
  },
}