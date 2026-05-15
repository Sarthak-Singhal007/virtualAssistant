import React from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => apiClient.post('/api/auth/signup', data),
  signin: (data) => apiClient.post('/api/auth/signin', data),
};

export const assistantAPI = {
  getAll: () => apiClient.get('/api/assistant'),
  create: (data) => apiClient.post('/api/assistant/create', data),
  getById: (id) => apiClient.get(`/api/assistant/${id}`),
};

export const userAPI = {
  getProfile: () => apiClient.get('/api/user/profile'),
  askAssistant: (data) => apiClient.post('/api/user/asktoassistant', data),
};

export default apiClient;
