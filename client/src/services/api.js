import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gg_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Extract response data & handle auth expiration
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    if (error.response?.status === 401 && localStorage.getItem('gg_token')) {
      // Clear token on 401 unauthorized
      localStorage.removeItem('gg_token');
      localStorage.removeItem('gg_user');
      window.dispatchEvent(new Event('auth-change'));
    }
    return Promise.reject(new Error(message));
  }
);

export default api;
