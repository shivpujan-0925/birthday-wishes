import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Interceptor to attach Viewer or Admin JWT from localStorage
api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('birthday_admin_token');
  const viewerToken = localStorage.getItem('birthday_viewer_token');

  if (config.url?.startsWith('/admin')) {
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  } else {
    if (viewerToken) {
      config.headers.Authorization = `Bearer ${viewerToken}`;
    }
  }
  return config;
}, (error) => Promise.reject(error));

export const authApi = {
  verifyDate: (date, month) => api.post('/auth/verify', { date, month }),
  adminLogin: (username, password) => api.post('/admin/login', { username, password }),
};

export const contentApi = {
  getWishes: () => api.get('/wishes'),
  getNote: () => api.get('/note'),
  getPhotos: () => api.get('/photos'),
};

export const adminApi = {
  uploadPhoto: (formData) => api.post('/admin/photos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updatePhoto: (id, data) => api.put(`/admin/photos/${id}`, data),
  deletePhoto: (id) => api.delete(`/admin/photos/${id}`),
  addWish: (data) => api.post('/admin/wishes', data),
  deleteWish: (id) => api.delete(`/admin/wishes/${id}`),
  updateNote: (data) => api.put('/admin/note', data),
};

export default api;
