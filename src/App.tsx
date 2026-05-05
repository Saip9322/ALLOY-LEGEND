/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { WelcomePopup } from './components/WelcomePopup';

import { AppProvider } from './context/AppContext';
import { Home } from './pages/Home';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import { PreOrders } from './pages/PreOrders';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';
import { TrackOrder } from './pages/TrackOrder';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminPreOrders } from './pages/admin/AdminPreOrders';
import { AdminSettings } from './pages/admin/AdminSettings';
import { ComingSoon } from './pages/ComingSoon';
import { BalanceCheckout } from './pages/BalanceCheckout';

// Set to true to hide all site content and show the Coming Soon page
const IS_COMING_SOON = true;

export default function App() {
  if (IS_COMING_SOON) {
    return (
      <AppProvider>
        <AuthProvider>
          <ProductProvider>
            <ComingSoon />
          </ProductProvider>
        </AuthProvider>
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/pre-orders" element={<PreOrders />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/checkout/balance/:orderId" element={<BalanceCheckout />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                    <Route path="/admin/preorders" element={<AdminPreOrders />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
              <WhatsAppWidget />
              <WelcomePopup />
            </div>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
    </AppProvider>
  );
}
