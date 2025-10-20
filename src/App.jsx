import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import './App.css';

// Components
import Header from './components/Layout/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payments';
import OrderConfirmation from './pages/OrderConfirmation';
import YourOrders from './pages/YourOrders';
import VerifyEmail from './components/VerifyEmail';
import BusinessAccount from './components/BusinessAccount';

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="/business-account" element={<BusinessAccount />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/your-orders" element={<YourOrders />} />
          </Routes>
      </Router>
    </Provider>
  );
}

export default App;