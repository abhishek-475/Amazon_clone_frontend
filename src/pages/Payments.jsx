import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../store/cartSlice';

const Payment = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    try {
      setIsProcessing(true);
      
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert('Razorpay SDK failed to load. Please check your internet connection.');
        return;
      }

      const { data: order } = await axios.post('https://amazon-clone-backend-1-s6de.onrender.com/api/payments/create-order', {
        amount: calculateTotal(),
        currency: 'INR'
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Amazon Clone',
        description: 'Product Purchase',
        order_id: order.id,
        handler: async function (response) {
          try {
            const { data } = await axios.post('https://amazon-clone-backend-1-s6de.onrender.com/api/payments/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (data.success) {
              await axios.post('https://amazon-clone-backend-1-s6de.onrender.com/api/orders', {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                userId: 'demo-user',
                items: cart.items,
                totalAmount: calculateTotal(),
                shippingAddress: JSON.parse(localStorage.getItem('shippingAddress') || '{}'),
                paymentMethod: 'razorpay'
              });

              dispatch(clearCart());
              localStorage.removeItem('shippingAddress');
              navigate('/order-confirmation', { 
                state: { 
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id
                }
              });
            } else {
              alert('Payment verification failed. Please try again.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#FFA41C'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleDemoPayment = () => {
    setTimeout(() => {
      const demoOrderId = 'ORD_' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const demoPaymentId = 'PAY_' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      axios.post('https://amazon-clone-backend-1-s6de.onrender.com/api/orders', {
        orderId: demoOrderId,
        paymentId: demoPaymentId,
        userId: 'demo-user',
        items: cart.items,
        totalAmount: calculateTotal(),
        shippingAddress: JSON.parse(localStorage.getItem('shippingAddress') || '{}'),
        paymentMethod: 'demo'
      }).then(() => {
        dispatch(clearCart());
        localStorage.removeItem('shippingAddress');
        navigate('/order-confirmation', { 
          state: { 
            orderId: demoOrderId,
            paymentId: demoPaymentId
          }
        });
      });
    }, 2000);
  };

  const handlePayment = () => {
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      handleDemoPayment();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Methods Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Payment Method</h2>
              
              {/* Razorpay Option */}
              <div className="mb-4">
                <label className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-orange-400 cursor-pointer transition-colors">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="razorpay" 
                    checked={paymentMethod === 'razorpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 text-orange-500 focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <span className="block text-sm font-medium text-gray-900">
                      Razorpay (Credit/Debit Card, UPI, Net Banking)
                    </span>
                    <span className="block text-sm text-gray-500 mt-1">
                      Secure payment with Razorpay
                    </span>
                  </div>
                </label>
              </div>

              {/* Demo Payment Option */}
              <div className="mb-6">
                <label className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-orange-400 cursor-pointer transition-colors">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="demo" 
                    checked={paymentMethod === 'demo'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 text-orange-500 focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <span className="block text-sm font-medium text-gray-900">
                      Demo Payment
                    </span>
                    <span className="block text-sm text-gray-500 mt-1">
                      Simulate successful payment for testing
                    </span>
                  </div>
                </label>
              </div>

              {/* Card Details Form */}
              {paymentMethod === 'card' && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Card Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="number"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={handleCardInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={handleCardInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={handleCardInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cart.items.map(item => (
                  <div key={item._id} className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 object-contain border border-gray-200 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </span>
                      <span className="block text-sm text-gray-500">
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
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Items ({cart.items.reduce((total, item) => total + item.quantity, 0)}):
                  </span>
                  <span className="text-gray-900">₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-green-600">₹0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax:</span>
                  <span className="text-gray-900">₹0.00</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-gray-900">₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Button */}
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors ${
                  isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  `Pay ₹${calculateTotal().toFixed(2)}`
                )}
              </button>
              
              {/* Security Info */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-green-600 mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure payment</span>
                </div>
                <p className="text-xs text-gray-500">
                  Your payment information is encrypted and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;