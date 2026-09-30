const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

// Helper to get or create cart for user
const getUserCart = async (userId) => {
  let cart = await prisma.cart.findFirst({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: { images: true, category: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: {
              include: { images: true, category: true },
            },
          },
        },
      },
    });
  }

  return cart;
};

const getCart = async (req, res, next) => {
  try {
    const cart = await getUserCart(req.user.id);
    return sendSuccess(res, { cart }, 'User cart retrieved');
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return sendError(res, 'productId is required', 400);
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return sendError(res, 'Product not found', 404);
    }

    const cart = await getUserCart(req.user.id);

    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + parseInt(quantity) },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: parseInt(quantity),
        },
      });
    }

    const updatedCart = await getUserCart(req.user.id);
    return sendSuccess(res, { cart: updatedCart }, 'Item added to cart');
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { id } = req.params; // cartItem id
    const { quantity } = req.body;

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id } });
    } else {
      await prisma.cartItem.update({
        where: { id },
        data: { quantity: parseInt(quantity) },
      });
    }

    const updatedCart = await getUserCart(req.user.id);
    return sendSuccess(res, { cart: updatedCart }, 'Cart updated');
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    const { id } = req.params; // cartItem id
    await prisma.cartItem.delete({ where: { id } });
    const updatedCart = await getUserCart(req.user.id);
    return sendSuccess(res, { cart: updatedCart }, 'Item removed from cart');
  } catch (error) {
    next(error);
  }
};

const syncGuestCart = async (req, res, next) => {
  try {
    const { guestItems = [] } = req.body; // array of { productId, quantity }

    const cart = await getUserCart(req.user.id);

    for (const item of guestItems) {
      if (!item.productId) continue;
      const existing = await prisma.cartItem.findFirst({
        where: { cartId: cart.id, productId: item.productId },
      });

      if (existing) {
        await prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + (item.quantity || 1) },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: item.productId,
            quantity: item.quantity || 1,
          },
        });
      }
    }

    const mergedCart = await getUserCart(req.user.id);
    return sendSuccess(res, { cart: mergedCart }, 'Guest cart merged successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  syncGuestCart,
};
