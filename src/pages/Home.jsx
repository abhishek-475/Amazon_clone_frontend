import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Layout/Navbar';


const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Carousel banners data
  const banners = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1500&h=400&fit=crop",
      title: "Great Indian Festival",
      subtitle: "Up to 70% off | Electronics, Fashion & more",
      buttonText: "Shop now"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1500&h=400&fit=crop",
      title: "Deals on Smartphones",
      subtitle: "Latest launches from Apple, Samsung & more",
      buttonText: "See deals"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1500&h=400&fit=crop",
      title: "Home & Kitchen Essentials",
      subtitle: "Up to 50% off on appliances & cookware",
      buttonText: "Explore"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1500&h=400&fit=crop",
      title: "Fashion Sale",
      subtitle: "Trending styles for men & women",
      buttonText: "Discover"
    }
  ];

  useEffect(() => {
    fetchProducts();
    // Auto slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      // Get featured products (products with isFeatured flag or top rated)
      const featured = products
        .filter(product => product.isFeatured || product.rating >= 4.5)
        .slice(0, 8);
      setFeaturedProducts(featured);

      // Extract categories
      const uniqueCategories = [...new Set(products
        .filter(p => p.category)
        .map(p => p.category)
      )];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://amazon-clone-backend-1-s6de.onrender.com/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-[1500px] mx-auto pt-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-[1500px] mx-auto">

        {/* Hero Carousel */}
        <div className="relative h-[300px] md:h-[400px] bg-gray-200 overflow-hidden">
          {/* Carousel Container */}
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <div key={banner.id} className="w-full flex-shrink-0 relative">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2 text-white max-w-md">
                  <h1 className="text-2xl md:text-4xl font-bold mb-2">{banner.title}</h1>
                  <p className="text-lg md:text-xl mb-4">{banner.subtitle}</p>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-md transition-colors duration-200">
                    {banner.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-yellow-400' : 'bg-white bg-opacity-50'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Product Categories Grid */}
        <div className="px-4 py-8">
          {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {categories.slice(0, 12).map((category, index) => (
              <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">{category}</span>
              </div>
            ))}
          </div> */}

          {/* Featured Products Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-normal text-gray-900">Featured Products</h2>
              <button className="text-blue-600 hover:text-orange-700 text-sm font-medium">
                See more
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>

          {/* Today's Deals Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-normal text-gray-900">Today's Deals</h2>
              <button className="text-blue-600 hover:text-orange-700 text-sm font-medium">
                See all deals
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {products.filter(p => p.discount).slice(0, 6).map(product => (
                <div key={product._id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="relative mb-2">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-32 object-contain"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-1">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(product.rating))}
                      <span className="text-gray-300">
                        {'★'.repeat(5 - Math.floor(product.rating))}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600 ml-1">({product.numReviews})</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Sections */}
          {categories.slice(0, 4).map(category => {
            const categoryProducts = products
              .filter(p => p.category === category)
              .slice(0, 4);

            if (categoryProducts.length === 0) return null;

            return (
              <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-normal text-gray-900">{category}</h2>
                  <button className="text-blue-600 hover:text-orange-700 text-sm font-medium">
                    Shop now
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Best Sellers Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-normal text-gray-900">Best Sellers</h2>
              <button className="text-blue-600 hover:text-orange-700 text-sm font-medium">
                View more
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .sort((a, b) => b.numReviews - a.numReviews)
                .slice(0, 4)
                .map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;