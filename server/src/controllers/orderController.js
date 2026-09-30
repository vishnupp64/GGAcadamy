const prisma = require('../config/db');
const paymentService = require('../services/paymentService');
const { sendSuccess, sendError } = require('../utils/response');

const createOrder = async (req, res, next) => {
  try {
    const { items, customerInfo, paymentMethod = 'CARD' } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return sendError(res, 'Order must contain at least one item.', 400);
    }

    if (!customerInfo || !customerInfo.email || !customerInfo.name) {
      return sendError(res, 'Customer contact information is required.', 400);
    }

    // Calculate subtotal & totals
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const dbProduct = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!dbProduct) {
        return sendError(res, `Product not found: ${item.productId}`, 400);
      }
      const price = dbProduct.discountPrice || dbProduct.price;
      const qty = parseInt(item.quantity) || 1;
      subtotal += price * qty;
      validatedItems.push({
        productId: dbProduct.id,
        price,
        quantity: qty,
        productName: dbProduct.name,
      });
    }

    const discount = 0;
    const amount = subtotal - discount;
    const orderNumber = `GG-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    // Process via PaymentService abstraction
    const paymentResult = await paymentService.processPayment({
      amount,
      currency: 'INR',
      orderId: orderNumber,
      customerInfo,
      paymentMethod,
    });

    const userId = req.user ? req.user.id : null;

    // Create Order and OrderItems in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        amount,
        subtotal,
        discount,
        paymentStatus: paymentResult.status || 'PAID',
        orderStatus: 'COMPLETED',
        paymentMethod,
        transactionId: paymentResult.transactionId,
        customerInfo: JSON.stringify(customerInfo),
        items: {
          create: validatedItems.map((i) => ({
            productId: i.productId,
            price: i.price,
            quantity: i.quantity,
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    // Auto-enroll user into courses if any item corresponds to a course or bundle
    if (userId) {
      const allCourses = await prisma.course.findMany({ select: { id: true, title: true, slug: true } });
      for (const course of allCourses) {
        const alreadyEnrolled = await prisma.enrollment.findFirst({
          where: { userId, courseId: course.id },
        });
        if (!alreadyEnrolled) {
          await prisma.enrollment.create({
            data: {
              userId,
              courseId: course.id,
              orderId: order.id,
            },
          });
        }
      }

      // Clear user cart after checkout
      const cart = await prisma.cart.findFirst({ where: { userId } });
      if (cart) {
        await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
      }
    }

    return sendSuccess(res, { order }, 'Order placed successfully!', 201);
  } catch (error) {
    next(error);
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        items: {
          include: {
            product: { include: { images: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return sendSuccess(res, { orders }, 'User orders');
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: { include: { images: true } },
          },
        },
      },
    });

    if (!order) {
      return sendError(res, 'Order not found', 404);
    }

    if (req.user && req.user.role !== 'ADMIN' && order.userId && order.userId !== req.user.id) {
      return sendError(res, 'Access denied', 403);
    }

    return sendSuccess(res, { order }, 'Order details');
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where = {};
    if (status) where.orderStatus = status;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true } },
          items: { include: { product: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.order.count({ where }),
    ]);

    return sendSuccess(res, {
      orders,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const updated = await prisma.order.update({
      where: { id },
      data: {
        ...(orderStatus && { orderStatus }),
        ...(paymentStatus && { paymentStatus }),
      },
    });

    return sendSuccess(res, { order: updated }, 'Order status updated');
  } catch (error) {
    next(error);
  }
};

const createRazorpayOrder = async (req, res, next) => {
  try {
    const { items, customerInfo } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return sendError(res, 'Order must contain at least one item.', 400);
    }

    if (!customerInfo || !customerInfo.email || !customerInfo.name) {
      return sendError(res, 'Customer contact information is required.', 400);
    }

    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const dbProduct = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!dbProduct) {
        return sendError(res, `Product not found: ${item.productId}`, 400);
      }
      const price = dbProduct.discountPrice || dbProduct.price;
      const qty = parseInt(item.quantity) || 1;
      subtotal += price * qty;
      validatedItems.push({
        productId: dbProduct.id,
        price,
        quantity: qty,
        productName: dbProduct.name,
      });
    }

    const discount = 0;
    const amount = subtotal - discount;
    const orderNumber = `GG-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    const userId = req.user ? req.user.id : null;

    // Process Razorpay Order
    const paymentResult = await paymentService.processPayment({
      amount,
      currency: 'INR',
      orderId: orderNumber,
      customerInfo,
      paymentMethod: 'RAZORPAY',
    });

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        amount,
        subtotal,
        discount,
        paymentStatus: 'PENDING',
        orderStatus: 'PENDING',
        paymentMethod: 'RAZORPAY',
        razorpayOrderId: paymentResult.razorpayOrderId,
        customerInfo: JSON.stringify(customerInfo),
        items: {
          create: validatedItems.map((i) => ({
            productId: i.productId,
            price: i.price,
            quantity: i.quantity,
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    return sendSuccess(
      res,
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
        razorpayOrderId: paymentResult.razorpayOrderId,
        amount: order.amount,
        currency: 'INR',
        keyId: paymentResult.keyId,
      },
      'Razorpay order initialized',
      201
    );
  } catch (error) {
    next(error);
  }
};

const verifyRazorpayPayment = async (req, res, next) => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!orderId || !razorpay_order_id || !razorpay_payment_id) {
      return sendError(res, 'Missing payment verification credentials.', 400);
    }

    const isSignatureValid = paymentService.verifyRazorpayPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!isSignatureValid) {
      await prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'FAILED', orderStatus: 'CANCELLED' },
      });
      return sendError(res, 'Invalid Razorpay payment signature.', 400);
    }

    // Update order status in DB
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        orderStatus: 'COMPLETED',
        transactionId: razorpay_payment_id,
        razorpayPaymentId: razorpay_payment_id,
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    // Auto-enroll user into courses if authenticated
    if (order.userId) {
      const allCourses = await prisma.course.findMany({ select: { id: true } });
      for (const course of allCourses) {
        const alreadyEnrolled = await prisma.enrollment.findFirst({
          where: { userId: order.userId, courseId: course.id },
        });
        if (!alreadyEnrolled) {
          await prisma.enrollment.create({
            data: {
              userId: order.userId,
              courseId: course.id,
              orderId: order.id,
            },
          });
        }
      }

      // Clear user cart
      const cart = await prisma.cart.findFirst({ where: { userId: order.userId } });
      if (cart) {
        await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
      }
    }

    return sendSuccess(res, { order }, 'Payment verified and order completed successfully!');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};

