import axiosInstance from '../config/axiosConfig';

export const authService = {
  async login(email, password) {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  async register(email, password, name) {
    const response = await axiosInstance.post('/auth/register', {
      email,
      password,
      name,
    });
    return response.data;
  },

  async logout() {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },

  async getCurrentUser() {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  async verifyToken(token) {
    const response = await axiosInstance.post('/auth/verify', { token });
    return response.data;
  },
};