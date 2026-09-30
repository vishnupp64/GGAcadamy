import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { cartService } from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync cart when auth state changes
  useEffect(() => {
    const fetchOrSyncCart = async () => {
      setLoading(true);
      if (isAuthenticated) {
        try {
          // Check for guest cart items to merge
          const guestCartRaw = localStorage.getItem('gg_guest_cart');
          const guestCart = guestCartRaw ? JSON.parse(guestCartRaw) : [];

          if (guestCart.length > 0) {
            const guestItemsToSync = guestCart.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
            }));
            const syncRes = await cartService.syncGuestCart(guestItemsToSync);
            localStorage.removeItem('gg_guest_cart');
            if (syncRes.data?.cart?.items) {
              setCartItems(formatDbItems(syncRes.data.cart.items));
            }
          } else {
            const res = await cartService.getCart();
            if (res.data?.cart?.items) {
              setCartItems(formatDbItems(res.data.cart.items));
            }
          }
        } catch (err) {
          console.error('Error loading DB cart:', err);
        }
      } else {
        // Load guest cart from localStorage
        const saved = localStorage.getItem('gg_guest_cart');
        setCartItems(saved ? JSON.parse(saved) : []);
      }
      setLoading(false);
    };

    fetchOrSyncCart();
  }, [isAuthenticated, user?.id]);

  // Save guest cart to localStorage when not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      localStorage.setItem('gg_guest_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated, loading]);

  const formatDbItems = (dbItems) => {
    return dbItems.map((item) => ({
      id: item.id,
      product: item.product,
      quantity: item.quantity,
    }));
  };

  const addToCart = async (product, quantity = 1) => {
    if (isAuthenticated) {
      try {
        const res = await cartService.addToCart(product.id, quantity);
        if (res.data?.cart?.items) {
          setCartItems(formatDbItems(res.data.cart.items));
        }
      } catch (err) {
        console.error('Failed adding to DB cart:', err);
      }
    } else {
      setCartItems((prev) => {
        const existingIdx = prev.findIndex((i) => i.product.id === product.id);
        if (existingIdx > -1) {
          const next = [...prev];
          next[existingIdx].quantity += quantity;
          return next;
        } else {
          return [...prev, { product, quantity }];
        }
      });
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    if (isAuthenticated) {
      try {
        const targetItem = cartItems.find((i) => i.product.id === productId);
        if (targetItem?.id) {
          const res = await cartService.updateCartItem(targetItem.id, quantity);
          if (res.data?.cart?.items) {
            setCartItems(formatDbItems(res.data.cart.items));
          }
        }
      } catch (err) {
        console.error('Failed updating cart quantity:', err);
      }
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
      );
    }
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated) {
      try {
        const targetItem = cartItems.find((i) => i.product.id === productId);
        if (targetItem?.id) {
          const res = await cartService.deleteCartItem(targetItem.id);
          if (res.data?.cart?.items) {
            setCartItems(formatDbItems(res.data.cart.items));
          }
        }
      } catch (err) {
        console.error('Failed removing cart item:', err);
      }
    } else {
      setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (!isAuthenticated) {
      localStorage.removeItem('gg_guest_cart');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.discountPrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
