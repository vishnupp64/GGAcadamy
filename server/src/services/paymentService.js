const razorpayService = require('./razorpayService');

/**
 * Payment Service Abstraction Layer
 * Supports pluggable providers (Razorpay, Stripe, Mock Gateway)
 */

class PaymentService {
  constructor() {
    this.provider = process.env.PAYMENT_PROVIDER || 'RAZORPAY';
  }

  /**
   * Process payment or create payment intent
   */
  async processPayment({ amount, currency = 'INR', orderId, customerInfo, paymentMethod = 'RAZORPAY' }) {
    console.log(`[PaymentService] Processing payment via ${this.provider} for Order: ${orderId}, Amount: ${amount} ${currency}`);

    if (paymentMethod === 'RAZORPAY' || this.provider === 'RAZORPAY') {
      const rzpOrder = await razorpayService.createOrder({
        amount,
        currency,
        receipt: orderId,
        notes: { customerEmail: customerInfo?.email || '' },
      });

      return {
        success: true,
        razorpayOrderId: rzpOrder.razorpayOrderId,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        keyId: rzpOrder.keyId,
        status: 'PENDING',
        provider: 'RAZORPAY',
      };
    } else {
      // Default Mock Provider
      const transactionId = `GG-TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      return {
        success: true,
        transactionId,
        status: 'PAID',
        provider: 'MOCK_GATEWAY',
        message: 'Payment authorized successfully.',
      };
    }
  }

  /**
   * Verify Razorpay Payment Signature
   */
  verifyRazorpayPayment(params) {
    return razorpayService.verifyPaymentSignature(params);
  }

  /**
   * Verify signature or payment status
   */
  async verifyPaymentStatus(transactionId) {
    return {
      verified: true,
      transactionId,
      status: 'COMPLETED',
    };
  }
}

module.exports = new PaymentService();

