import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../store/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://amazon-clone-backend-1-s6de.onrender.com/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity: quantity
    }));
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  // Calculate discounted price
  const discountedPrice = product?.discount 
    ? product.price - (product.price * product.discount / 100)
    : null;

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Generate star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-sm ${
              index < fullStars 
                ? 'text-yellow-400' 
                : index === fullStars && hasHalfStar 
                ? 'text-yellow-400' 
                : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-blue-600 hover:text-orange-700 text-sm ml-2 cursor-pointer">
          {product?.numReviews || 0} ratings
        </span>
      </div>
    );
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span>Home </span>
          <span>› </span>
          <span>{product.category} </span>
          <span>› </span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images */}
            <div className="lg:w-1/2">
              <div className="flex flex-col-reverse md:flex-row gap-4">
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-2 order-2 md:order-1">
                  {product.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className={`w-16 h-16 object-contain border-2 rounded cursor-pointer ${
                        selectedImage === index 
                          ? 'border-orange-400' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
                
                {/* Main Image */}
                <div className="flex-1 order-1 md:order-2">
                  <img 
                    src={product.images?.[selectedImage] || product.image} 
                    alt={product.name}
                    className="w-full h-96 object-contain border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="mb-4">
                {renderStars(product.rating || 0)}
              </div>

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(discountedPrice || product.price)}
                  </span>
                  
                  {discountedPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                        Save {product.discount}%
                      </span>
                    </>
                  )}
                </div>
                
                <div className="text-sm text-green-600 font-semibold">
                  FREE delivery <strong>Tomorrow</strong>
                </div>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">About this item:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2 mt-1">•</span>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity:
                </label>
                <select 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <option key={num} value={num}>Qty: {num}</option>
                  ))}
                </select>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.countInStock > 0 ? (
                  <span className="text-green-600 font-semibold text-sm">
                    ✓ In Stock
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold text-sm">
                    ✗ Out of Stock
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 border border-yellow-500 text-sm"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 border border-orange-500 text-sm"
                >
                  Buy Now
                </button>
              </div>

              {/* Security & Delivery Info */}
              <div className="text-xs text-gray-600 space-y-2">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure transaction</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Ships from Amazon</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>FREE delivery tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'description'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Product Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'specifications'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Customer Reviews ({product.numReviews || 0})
              </button>
            </nav>
          </div>

          {/* Tabs Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                {product.features && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                {product.specifications ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="border-b border-gray-200 pb-2">
                        <span className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-gray-700 ml-2">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No specifications available.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
                {product.reviews?.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <strong className="text-gray-900">{review.user}</strong>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <span className="text-sm text-gray-500">
                          Reviewed on {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;