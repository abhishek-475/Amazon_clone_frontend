import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const calculateSubtotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const getTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save shipping address to localStorage or context
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 pt-20">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-normal text-gray-900">Checkout</h1>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <span className="text-blue-600">Cart</span>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Shipping address</span>
            <span className="mx-2">›</span>
            <span>Payment method</span>
            <span className="mx-2">›</span>
            <span>Place order</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form Section */}
          <div className="lg:w-2/3">
            {/* Shipping Address */}
            <div className="border border-gray-300 rounded-md mb-6">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                <h2 className="text-lg font-normal text-gray-900">1. Shipping address</h2>
              </div>
              
              <div className="p-4">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name (First and Last name)
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={shippingAddress.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Enter your address"
                        value={shippingAddress.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          placeholder="Enter your city"
                          value={shippingAddress.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          placeholder="Enter your state"
                          value={shippingAddress.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          placeholder="Enter PIN code"
                          value={shippingAddress.pincode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Enter phone number"
                          value={shippingAddress.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-gray-300 rounded-md">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                <h2 className="text-lg font-normal text-gray-900">2. Payment method</h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {/* Credit/Debit Card */}
                  <label className="flex items-start space-x-3 p-3 border border-gray-300 rounded-md hover:border-blue-500 cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="card" 
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">Credit or Debit Card</span>
                        <div className="flex space-x-2">
                          <img src="https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png" alt="Visa" className="h-6" />
                          <img src="https://logos-world.net/wp-content/uploads/2020/04/Mastercard-Logo.png" alt="Mastercard" className="h-6" />
                          <img src="https://logos-world.net/wp-content/uploads/2020/07/American-Express-Logo.png" alt="Amex" className="h-6" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Pay with your credit or debit card</p>
                    </div>
                  </label>

                  {/* UPI */}
                  <label className="flex items-start space-x-3 p-3 border border-gray-300 rounded-md hover:border-blue-500 cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="upi" 
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">UPI</span>
                        <div className="flex space-x-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Pay_%28GPay%29_Logo.svg" alt="Google Pay" className="h-6" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f0/PhonePe_Logo.svg" alt="PhonePe" className="h-6" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Paytm_Logo.jpg" alt="Paytm" className="h-6" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Pay using UPI apps</p>
                    </div>
                  </label>

                  {/* Net Banking */}
                  <label className="flex items-start space-x-3 p-3 border border-gray-300 rounded-md hover:border-blue-500 cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="netbanking" 
                      checked={paymentMethod === 'netbanking'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900">Net Banking</span>
                      <p className="text-xs text-gray-600 mt-1">Pay using your bank account</p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label className="flex items-start space-x-3 p-3 border border-gray-300 rounded-md hover:border-blue-500 cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod" 
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900">Cash on Delivery/Pay on Delivery</span>
                      <p className="text-xs text-gray-600 mt-1">Pay when you receive your order</p>
                    </div>
                  </label>
                </div>

                {/* Continue Button */}
                <button 
                  onClick={handleSubmit}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-normal py-2 px-4 rounded-md transition-colors duration-200 border border-yellow-400 shadow-sm mt-6"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <div className="border border-gray-300 rounded-md p-4 sticky top-24">
              <button 
                onClick={handleSubmit}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-normal py-2 px-4 rounded-md transition-colors duration-200 border border-yellow-400 shadow-sm mb-4"
              >
                Continue
              </button>
              
              <h3 className="text-lg font-normal text-gray-900 mb-4">Order Summary</h3>
              
              {/* Order Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.items.map(item => (
                  <div key={item._id} className="flex items-center space-x-3">
                    <img 
                      src={item.images?.[0] || item.image} 
                      alt={item.name} 
                      className="w-12 h-12 object-contain border border-gray-200 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm text-gray-900 truncate">
                        {item.name}
                      </span>
                      <span className="block text-xs text-gray-500">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items ({getTotalItems()}):</span>
                  <span className="text-gray-900">₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                  <span className="text-gray-900">Order Total:</span>
                  <span className="text-gray-900">₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center text-green-700 text-sm mb-1">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Your order is eligible for FREE Delivery</span>
                </div>
                <p className="text-xs text-green-600">Select this option at checkout</p>
              </div>
            </div>

            {/* Return Policy */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-600">
                <Link to="/returns" className="text-blue-600 hover:text-orange-700 hover:underline">
                  Amazon.in Return Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;