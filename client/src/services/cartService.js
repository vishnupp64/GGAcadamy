import api from './api';

export const cartService = {
  getCart: async () => {
    return await api.get('/cart');
  },

  addToCart: async (productId, quantity = 1) => {
    return await api.post('/cart', { productId, quantity });
  },

  updateCartItem: async (id, quantity) => {
    return await api.put(`/cart/${id}`, { quantity });
  },

  deleteCartItem: async (id) => {
    return await api.delete(`/cart/${id}`);
  },

  syncGuestCart: async (guestItems) => {
    return await api.post('/cart/sync', { guestItems });
  },
};
