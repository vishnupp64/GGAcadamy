import api from './api';

export const productService = {
  getProducts: async (params = {}) => {
    return await api.get('/products', { params });
  },

  getProductBySlug: async (slug) => {
    return await api.get(`/products/${slug}`);
  },

  getCategories: async () => {
    return await api.get('/categories');
  },

  createProduct: async (productData) => {
    return await api.post('/products', productData);
  },

  updateProduct: async (id, productData) => {
    return await api.put(`/products/${id}`, productData);
  },

  deleteProduct: async (id) => {
    return await api.delete(`/products/${id}`);
  },
};
