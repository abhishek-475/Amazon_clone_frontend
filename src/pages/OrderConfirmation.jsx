import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId, paymentId } = location.state || {};

  const orderDetails = {
    orderId: orderId || `OD${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    paymentId: paymentId || `PY${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    orderDate: new Date().toLocaleDateString('en-IN', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    }),
    deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    })
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 pt-16 sm:pt-20">
        {/* Success Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-normal text-gray-900 mb-2">Thank you, your order has been placed</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            You will receive an email confirmation shortly at <span className="text-blue-600">customer@example.com</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3 flex flex-col gap-4 sm:gap-6">
            {/* Order Details Card */}
            <div className="border border-gray-300 rounded-md">
              <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300">
                <h2 className="text-md sm:text-lg font-normal text-gray-900">Order Details</h2>
              </div>
              <div className="p-3 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1 sm:mb-2">Order Information</h3>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex justify-between"><span className="text-gray-600">Order ID:</span> <span className="font-medium text-gray-900">{orderDetails.orderId}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Order Date:</span> <span className="font-medium text-gray-900">{orderDetails.orderDate}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Payment ID:</span> <span className="font-medium text-gray-900">{orderDetails.paymentId}</span></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1 sm:mb-2">Delivery Information</h3>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex justify-between"><span className="text-gray-600">Estimated Delivery:</span> <span className="font-medium text-gray-900">{orderDetails.deliveryDate}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Shipping Method:</span> <span className="font-medium text-green-600">FREE Delivery</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Delivery Address:</span> <span className="font-medium text-gray-900">Your shipping address</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Progress */}
            <div className="border border-gray-300 rounded-md">
              <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300">
                <h2 className="text-md sm:text-lg font-normal text-gray-900">Order Progress</h2>
              </div>
              <div className="p-3 sm:p-4 space-y-4">
                {/* Progress Steps */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                    {['Ordered','Shipped','Out for Delivery','Delivered'].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-8 h-8 ${idx === 0 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'} rounded-full flex items-center justify-center text-sm font-medium`}>{idx+1}</div>
                        <span className="text-xs text-gray-600">{step}</span>
                        {idx !== 3 && <div className={`w-8 sm:w-12 h-0.5 ${idx === 0 ? 'bg-green-600' : 'bg-gray-300'}`}></div>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Status */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 sm:p-4">
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-blue-900 text-sm sm:text-base">Order Confirmed</h4>
                      <p className="text-blue-700 text-xs sm:text-sm">We've received your order and are preparing it for shipment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 flex-shrink-0 mt-4 lg:mt-0">
            <div className="border border-gray-300 rounded-md p-3 sm:p-4 lg:sticky lg:top-24 flex flex-col gap-3">
              <h3 className="font-medium text-gray-900 text-sm sm:text-base">Need help with your order?</h3>
              <div className="space-y-2 sm:space-y-3 text-sm">
                <Link to="/your-orders" className="block text-blue-600 hover:text-orange-700 hover:underline">Track your package</Link>
                <Link to="/contact" className="block text-blue-600 hover:text-orange-700 hover:underline">Contact customer service</Link>
                <Link to="/returns" className="block text-blue-600 hover:text-orange-700 hover:underline">Return or exchange items</Link>
                <Link to="/help" className="block text-blue-600 hover:text-orange-700 hover:underline">Visit the help section</Link>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 text-sm">
                <p className="text-gray-600">Call us 24/7 at <span className="text-blue-600 font-medium">1-800-123-4567</span></p>
              </div>
              <Link to="/your-orders" className="block w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-normal py-2 px-4 rounded-md mt-3 text-center text-sm border border-yellow-400 shadow-sm">View Your Orders</Link>
              <Link to="/" className="block w-full bg-white hover:bg-gray-50 text-gray-900 font-normal py-2 px-4 rounded-md text-center text-sm border border-gray-300 shadow-sm">Continue Shopping</Link>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 sm:mt-8 border border-gray-300 rounded-md p-3 sm:p-4">
          <div className="bg-gray-50 px-3 py-2 sm:px-4 sm:py-3 border-b border-gray-300">
            <h2 className="text-md sm:text-lg font-normal text-gray-900">What to expect next</h2>
          </div>
          <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm">
            {[
              { title: 'Email Confirmation', desc: 'Check your email for order details and tracking information', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-orange-600', bg: 'bg-orange-100' },
              { title: 'Secure Delivery', desc: 'Your items are packed securely and will arrive safely', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'text-blue-600', bg: 'bg-blue-100' },
              { title: 'Easy Returns', desc: "30-day return policy if you're not satisfied", icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', color: 'text-green-600', bg: 'bg-green-100' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <svg className={`w-6 h-6 ${item.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
