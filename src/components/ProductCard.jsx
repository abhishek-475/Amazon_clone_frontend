import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      ...product,
      quantity: 1
    }));
  };

  // Calculate discounted price if there's a discount
  const discountedPrice = product.discount 
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
            {index === fullStars && hasHalfStar ? '★' : '★'}
          </span>
        ))}
        <span className="text-xs text-blue-600 ml-1 hover:text-orange-700 cursor-pointer">
          {product.numReviews || 0}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:border-orange-400 hover:shadow-lg transition-all duration-200 group">
      <Link to={`/product/${product._id}`} className="block p-4">
        {/* Product Image */}
        <div className="relative mb-3">
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-200"
          />
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% off
            </span>
          )}
          
          {/* Prime Badge */}
          <span className="absolute top-2 right-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#00A8E1">
              <path d="M23.5,13.5c0,0.1,0,0.3-0.1,0.4l-3,4.5c-0.1,0.2-0.4,0.3-0.6,0.3h-6c-0.3,0-0.5-0.2-0.5-0.5v-4.5c0-0.3,0.2-0.5,0.5-0.5h6 c0.2,0,0.4,0.1,0.6,0.3l3,4.5C23.5,13.2,23.5,13.4,23.5,13.5z M20.5,9.5c0,0.1,0,0.3-0.1,0.4l-3,4.5c-0.1,0.2-0.4,0.3-0.6,0.3h-6 c-0.3,0-0.5-0.2-0.5-0.5V9.5c0-0.3,0.2-0.5,0.5-0.5h6c0.2,0,0.4,0.1,0.6,0.3l3,4.5C20.5,9.2,20.5,9.4,20.5,9.5z M17.5,5.5 c0,0.1,0,0.3-0.1,0.4l-3,4.5c-0.1,0.2-0.4,0.3-0.6,0.3h-6c-0.3,0-0.5-0.2-0.5-0.5V5.5c0-0.3,0.2-0.5,0.5-0.5h6c0.2,0,0.4,0.1,0.6,0.3 l3,4.5C17.5,5.2,17.5,5.4,17.5,5.5z"/>
            </svg>
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-sm text-gray-900 font-normal mb-2 line-clamp-2 h-10 overflow-hidden leading-5">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mb-2">
          {renderStars(product.rating || 0)}
        </div>

        {/* Price Section */}
        <div className="mb-2">
          {/* Current Price */}
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(discountedPrice || product.price)}
            </span>
            
            {/* Original Price with strikethrough */}
            {discountedPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          {/* Discount Percentage */}
          {discountedPrice && (
            <span className="text-sm text-red-600 font-semibold">
              Save {product.discount}%
            </span>
          )}
        </div>

        {/* Delivery Info */}
        <div className="text-xs text-gray-600 mb-2">
          <span className="font-semibold">FREE delivery</span>{' '}
          <span className="text-green-600 font-bold">Tomorrow</span>
        </div>

        {/* Key Features */}
        {product.features && product.features.length > 0 && (
          <ul className="text-xs text-gray-600 space-y-1 mb-3">
            {product.features.slice(0, 2).map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-1 mt-0.5">✓</span>
                <span className="flex-1">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Stock Status */}
        <div className="text-xs text-gray-600 mb-3">
          {product.countInStock > 0 ? (
            <span className="text-green-600 font-semibold">
              In Stock
            </span>
          ) : (
            <span className="text-red-600 font-semibold">
              Out of Stock
            </span>
          )}
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-200 border border-yellow-500 mb-2"
        >
          Add to Cart
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart(e);
            // Navigate to checkout or handle buy now
          }}
          className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-200 border border-orange-500"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;