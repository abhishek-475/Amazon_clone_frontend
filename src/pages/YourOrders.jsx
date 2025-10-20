import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const YourOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // For demo, using a static user ID. Replace with actual user ID from auth
      const response = await axios.get('https://amazon-clone-backend-1-s6de.onrender.com/api/orders/user/demo-user');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // For demo purposes, create some sample orders if none exist
      setOrders(getSampleOrders());
    } finally {
      setLoading(false);
    }
  };

  const getSampleOrders = () => {
    return [
      {
        _id: '1',
        orderId: 'OD-123-4567890-1234567',
        items: [
          {
            productId: { 
              name: 'Wireless Bluetooth Headphones with Noise Cancellation', 
              image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150',
              brand: 'Sony'
            },
            quantity: 1,
            price: 1999
          }
        ],
        totalAmount: 1999,
        status: 'delivered',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        deliveredDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        shippingAddress: {
          name: 'John Doe',
          address: '123 Main Street, Apartment 4B',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001'
        }
      },
      {
        _id: '2',
        orderId: 'OD-987-6543210-7654321',
        items: [
          {
            productId: { 
              name: 'Smartphone XYZ Pro Max 128GB', 
              image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150',
              brand: 'Apple'
            },
            quantity: 1,
            price: 79999
          },
          {
            productId: { 
              name: 'Premium Silicone Phone Case - Transparent', 
              image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=150',
              brand: 'ESR'
            },
            quantity: 2,
            price: 499
          }
        ],
        totalAmount: 80997,
        status: 'shipped',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        shippingAddress: {
          name: 'John Doe',
          address: '123 Main Street, Apartment 4B',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001'
        }
      },
      {
        _id: '3',
        orderId: 'OD-456-7890123-4567890',
        items: [
          {
            productId: { 
              name: 'Amazon Echo Dot (4th Gen) - Smart speaker with Alexa', 
              image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=150',
              brand: 'Amazon'
            },
            quantity: 1,
            price: 4499
          }
        ],
        totalAmount: 4499,
        status: 'confirmed',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        shippingAddress: {
          name: 'John Doe',
          address: '123 Main Street, Apartment 4B',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001'
        }
      }
    ];
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600';
      case 'confirmed': return 'text-blue-600';
      case 'shipped': return 'text-blue-600';
      case 'delivered': return 'text-green-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Order confirmed';
      case 'shipped': return 'Shipped';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'shipped':
        return (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="border border-gray-200 rounded-lg p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 pt-20">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-normal text-gray-900 mb-4">Your Orders</h1>
          
          {/* Time Filter */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-sm text-gray-600">Show:</span>
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="30">Past 30 days</option>
              <option value="90">Past 3 months</option>
              <option value="180">Past 6 months</option>
              <option value="365">Past year</option>
            </select>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              className={`px-4 py-2 text-sm border rounded-md ${
                filter === 'all' 
                  ? 'bg-gray-100 border-gray-400 text-gray-900' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setFilter('all')}
            >
              All Orders
            </button>
            <button 
              className={`px-4 py-2 text-sm border rounded-md ${
                filter === 'pending' 
                  ? 'bg-gray-100 border-gray-400 text-gray-900' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={`px-4 py-2 text-sm border rounded-md ${
                filter === 'confirmed' 
                  ? 'bg-gray-100 border-gray-400 text-gray-900' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed
            </button>
            <button 
              className={`px-4 py-2 text-sm border rounded-md ${
                filter === 'shipped' 
                  ? 'bg-gray-100 border-gray-400 text-gray-900' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setFilter('shipped')}
            >
              Shipped
            </button>
            <button 
              className={`px-4 py-2 text-sm border rounded-md ${
                filter === 'delivered' 
                  ? 'bg-gray-100 border-gray-400 text-gray-900' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setFilter('delivered')}
            >
              Delivered
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-normal text-gray-900 mb-2">No orders found</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <Link 
              to="/" 
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-normal py-2 px-6 rounded-md transition-colors duration-200 border border-yellow-400 shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <div key={order._id} className="border border-gray-300 rounded-lg">
                {/* Order Header */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <span className="text-gray-600">ORDER PLACED</span>
                          <p className="font-medium text-gray-900">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">TOTAL</span>
                          <p className="font-medium text-gray-900">₹{order.totalAmount?.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">SHIP TO</span>
                          <p className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                            {order.shippingAddress?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div>
                        <span className="text-gray-600">ORDER # {order.orderId}</span>
                      </div>
                      <div className={`flex items-center ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="font-medium">{getStatusText(order.status)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                      <img 
                        src={item.productId?.image || item.image} 
                        alt={item.productId?.name || item.name}
                        className="w-20 h-20 object-contain border border-gray-200 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-blue-600 hover:text-orange-700 hover:underline cursor-pointer text-lg">
                          {item.productId?.name || item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">{item.productId?.brand}</p>
                        <p className="text-gray-600 text-sm mt-1">Quantity: {item.quantity}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="text-blue-600 hover:text-orange-700 text-sm hover:underline">
                            Buy it again
                          </button>
                          <button className="text-blue-600 hover:text-orange-700 text-sm hover:underline">
                            View your item
                          </button>
                          {order.status === 'delivered' && (
                            <button className="text-blue-600 hover:text-orange-700 text-sm hover:underline">
                              Write a product review
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Order Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="mb-3 sm:mb-0">
                      {order.status === 'shipped' && order.estimatedDelivery && (
                        <p className="text-sm text-gray-600">
                          Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      )}
                      {order.status === 'delivered' && order.deliveredDate && (
                        <p className="text-sm text-gray-600">
                          Delivered on {new Date(order.deliveredDate).toLocaleDateString('en-IN', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      {order.status === 'shipped' && (
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-normal py-2 px-4 rounded-md transition-colors duration-200 border border-yellow-400 shadow-sm text-sm">
                          Track package
                        </button>
                      )}
                      <button className="bg-white hover:bg-gray-50 text-gray-900 font-normal py-2 px-4 rounded-md transition-colors duration-200 border border-gray-300 shadow-sm text-sm">
                        View order details
                      </button>
                      {order.status === 'delivered' && (
                        <button className="bg-white hover:bg-gray-50 text-gray-900 font-normal py-2 px-4 rounded-md transition-colors duration-200 border border-gray-300 shadow-sm text-sm">
                          Leave seller feedback
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YourOrders;