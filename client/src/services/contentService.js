import api from './api';

export const contentService = {
  getTestimonials: async () => {
    return await api.get('/testimonials');
  },

  getFAQs: async () => {
    return await api.get('/faqs');
  },

  submitContact: async (contactData) => {
    return await api.post('/contact', contactData);
  },

  getSettings: async () => {
    return await api.get('/settings');
  },
};
