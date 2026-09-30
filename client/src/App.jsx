import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';

import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';

// Public Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Collection } from './pages/Collection';
import { ProductDetails } from './pages/ProductDetails';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { RefundPolicy } from './pages/RefundPolicy';
import { Terms } from './pages/Terms';
import { ShippingPolicy } from './pages/ShippingPolicy';

// Protected Student Pages
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { MyCoursesPage } from './pages/MyCoursesPage';
import { CourseViewPage } from './pages/CourseViewPage';
import { AccountPage } from './pages/AccountPage';

// Admin Sub-Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCourses } from './pages/admin/AdminCourses';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminFAQs } from './pages/admin/AdminFAQs';
import { AdminContactMessages } from './pages/admin/AdminContactMessages';
import { AdminSettings } from './pages/admin/AdminSettings';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public & Student Main Layout Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="collection" element={<Collection />} />
              <Route path="products/:slug" element={<ProductDetails />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="refund-policy" element={<RefundPolicy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="shipping-policy" element={<ShippingPolicy />} />

              {/* Cart & Checkout */}
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />

              {/* Protected Student Routes */}
              <Route
                path="my-courses"
                element={
                  <ProtectedRoute>
                    <MyCoursesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="courses/:slug"
                element={
                  <ProtectedRoute>
                    <CourseViewPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="account"
                element={
                  <ProtectedRoute>
                    <AccountPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Admin Console Protected Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="faqs" element={<AdminFAQs />} />
              <Route path="contact-messages" element={<AdminContactMessages />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Fallback Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
