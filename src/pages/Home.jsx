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
  const [showFilters, setShowFilters] = useState(true); // Changed to true by default for desktop
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    sortBy: 'featured'
  });

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

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      sortBy: 'featured'
    });
  };

  const applyFilters = () => {
    console.log('Applied filters:', filters);
  };

  // Filter products based on current filters
  const getFilteredProducts = (productList) => {
    let filtered = [...productList];

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= parseInt(filters.maxPrice));
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= parseInt(filters.rating));
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming there's a createdAt field
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Default sorting (featured)
        break;
    }

    return filtered;
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

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full justify-center"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Filters & Sort</span>
          </button>
        </div>

        {/* Main Content Area with Sidebar */}
        <div className="flex flex-col lg:flex-row px-4 py-6 gap-6">
          {/* Filters Sidebar - Left Side */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all
                </button>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Sort By</h4>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={filters.category === ''}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="ml-2 text-sm text-gray-600">All Categories</span>
                  </label>
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="ml-2 text-sm text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Customer Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={filters.rating === rating.toString()}
                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                        className="text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="ml-2 text-sm text-gray-600 flex items-center">
                        {'★'.repeat(rating)}
                        <span className="text-gray-400">{'★'.repeat(5 - rating)}</span>
                        <span className="ml-1">& above</span>
                      </span>
                    </label>
                  ))}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value=""
                      checked={filters.rating === ''}
                      onChange={(e) => handleFilterChange('rating', e.target.value)}
                      className="text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="ml-2 text-sm text-gray-600">Any Rating</span>
                  </label>
                </div>
              </div>

              {/* Apply Filters Button for Mobile */}
              <div className="lg:hidden">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Content - Right Side */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {getFilteredProducts(products).length} products
                </div>
                <div className="text-sm text-gray-500">
                  Sorted by: {filters.sortBy === 'featured' ? 'Featured' : 
                            filters.sortBy === 'price-low' ? 'Price: Low to High' :
                            filters.sortBy === 'price-high' ? 'Price: High to Low' :
                            filters.sortBy === 'rating' ? 'Customer Rating' : 'Newest Arrivals'}
                </div>
              </div>
            </div>

            {/* Product Sections */}
            <div className="space-y-8">
              {/* Featured Products Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-normal text-gray-900">Featured Products</h2>
                  <button className="text-blue-600 hover:text-orange-700 text-sm font-medium">
                    See more
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getFilteredProducts(featuredProducts).map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>

              {/* Today's Deals Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-normal text-gray-900">Today's Deals</h2>
                  <button className="text-blue-600 hover:text-orange-700 text-sm font-medium">
                    See all deals
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {getFilteredProducts(products.filter(p => p.discount)).slice(0, 6).map(product => (
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
                const categoryProducts = getFilteredProducts(products
                  .filter(p => p.category === category))
                  .slice(0, 4);

                if (categoryProducts.length === 0) return null;

                return (
                  <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                  {getFilteredProducts(products)
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
      </div>
    </div>
  );
};

export default Home;