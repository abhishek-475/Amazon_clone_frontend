import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId, paymentId } = location.state || {};

  // Generate random order details if not provided
  const orderDetails = {
    orderId: orderId || `OD${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    paymentId: paymentId || `PY${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    orderDate: new Date().toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 pt-20">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-normal text-gray-900 mb-2">Thank you, your order has been placed</h1>
          <p className="text-gray-600">
            You will receive an email confirmation shortly at <span className="text-blue-600">customer@example.com</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Order Details Card */}
            <div className="border border-gray-300 rounded-md mb-6">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                <h2 className="text-lg font-normal text-gray-900">Order Details</h2>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Order Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-medium text-gray-900">{orderDetails.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date:</span>
                        <span className="font-medium text-gray-900">{orderDetails.orderDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment ID:</span>
                        <span className="font-medium text-gray-900">{orderDetails.paymentId}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Delivery Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Delivery:</span>
                        <span className="font-medium text-gray-900">{orderDetails.deliveryDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping Method:</span>
                        <span className="font-medium text-green-600">FREE Delivery</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Address:</span>
                        <span className="font-medium text-gray-900">Your shipping address</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Progress */}
            <div className="border border-gray-300 rounded-md">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                <h2 className="text-lg font-normal text-gray-900">Order Progress</h2>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  {/* Progress Steps */}
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        1
                      </div>
                      <span className="text-xs text-gray-600 mt-1">Ordered</span>
                    </div>
                    <div className="w-12 h-0.5 bg-green-600 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                        2
                      </div>
                      <span className="text-xs text-gray-600 mt-1">Shipped</span>
                    </div>
                    <div className="w-12 h-0.5 bg-gray-300 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                        3
                      </div>
                      <span className="text-xs text-gray-600 mt-1">Out for Delivery</span>
                    </div>
                    <div className="w-12 h-0.5 bg-gray-300 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                        4
                      </div>
                      <span className="text-xs text-gray-600 mt-1">Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Current Status */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-blue-900">Order Confirmed</h4>
                      <p className="text-sm text-blue-700">We've received your order and are preparing it for shipment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="border border-gray-300 rounded-md p-4 sticky top-24">
              <h3 className="font-medium text-gray-900 mb-4">Need help with your order?</h3>
              
              <div className="space-y-3 text-sm">
                <Link to="/your-orders" className="block text-blue-600 hover:text-orange-700 hover:underline">
                  Track your package
                </Link>
                <Link to="/contact" className="block text-blue-600 hover:text-orange-700 hover:underline">
                  Contact customer service
                </Link>
                <Link to="/returns" className="block text-blue-600 hover:text-orange-700 hover-underline">
                  Return or exchange items
                </Link>
                <Link to="/help" className="block text-blue-600 hover:text-orange-700 hover:underline">
                  Visit the help section
                </Link>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Customer Service</h4>
                <p className="text-sm text-gray-600">
                  Call us 24/7 at{' '}
                  <span className="text-blue-600 font-medium">1-800-123-4567</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-3">
              <Link 
                to="/your-orders" 
                className="block w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-normal py-2 px-4 rounded-md transition-colors duration-200 border border-yellow-400 shadow-sm text-center text-sm"
              >
                View Your Orders
              </Link>
              <Link 
                to="/" 
                className="block w-full bg-white hover:bg-gray-50 text-gray-900 font-normal py-2 px-4 rounded-md transition-colors duration-200 border border-gray-300 shadow-sm text-center text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 border border-gray-300 rounded-md">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
            <h2 className="text-lg font-normal text-gray-900">What to expect next</h2>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Email Confirmation</h4>
                <p className="text-gray-600">Check your email for order details and tracking information</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Secure Delivery</h4>
                <p className="text-gray-600">Your items are packed securely and will arrive safely</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Easy Returns</h4>
                <p className="text-gray-600">30-day return policy if you're not satisfied</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;