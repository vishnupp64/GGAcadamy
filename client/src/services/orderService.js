import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    return await api.post('/orders', orderData);
  },

  createRazorpayOrder: async (orderData) => {
    return await api.post('/orders/razorpay/create-order', orderData);
  },

  verifyRazorpayPayment: async (paymentData) => {
    return await api.post('/orders/razorpay/verify-payment', paymentData);
  },

  getUserOrders: async () => {
    return await api.get('/orders');
  },

  getOrderById: async (id) => {
    return await api.get(`/orders/${id}`);
  },

  getAllOrders: async (params = {}) => {
    return await api.get('/orders/admin/all', { params });
  },

  updateOrderStatus: async (id, statusData) => {
    return await api.put(`/orders/admin/${id}/status`, statusData);
  },
};

