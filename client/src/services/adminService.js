import api from './api';

export const adminService = {
  getDashboardStats: async () => {
    return await api.get('/admin/dashboard');
  },

  getUsers: async (params = {}) => {
    return await api.get('/admin/users', { params });
  },

  updateUserRole: async (id, role) => {
    return await api.put(`/admin/users/${id}/role`, { role });
  },

  getContactMessages: async () => {
    return await api.get('/contact');
  },

  markMessageAsRead: async (id) => {
    return await api.put(`/contact/${id}/read`);
  },

  updateSettings: async (settingsData) => {
    return await api.put('/settings', settingsData);
  },

  createTestimonial: async (data) => {
    return await api.post('/testimonials', data);
  },
  updateTestimonial: async (id, data) => {
    return await api.put(`/testimonials/${id}`, data);
  },
  deleteTestimonial: async (id) => {
    return await api.delete(`/testimonials/${id}`);
  },

  createFAQ: async (data) => {
    return await api.post('/faqs', data);
  },
  updateFAQ: async (id, data) => {
    return await api.put(`/faqs/${id}`, data);
  },
  deleteFAQ: async (id) => {
    return await api.delete(`/faqs/${id}`);
  },
};
