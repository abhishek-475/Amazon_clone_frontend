import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Layout/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    sortBy: "featured",
  });

  const banners = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1500&h=400&fit=crop",
      title: "Great Indian Festival",
      subtitle: "Up to 70% off | Electronics, Fashion & more",
      buttonText: "Shop now",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1500&h=400&fit=crop",
      title: "Deals on Smartphones",
      subtitle: "Latest launches from Apple, Samsung & more",
      buttonText: "See deals",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1500&h=400&fit=crop",
      title: "Home & Kitchen Essentials",
      subtitle: "Up to 50% off on appliances & cookware",
      buttonText: "Explore",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1500&h=400&fit=crop",
      title: "Fashion Sale",
      subtitle: "Trending styles for men & women",
      buttonText: "Discover",
    },
  ];

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const featured = products
        .filter((product) => product.isFeatured || product.rating >= 4.5)
        .slice(0, 8);
      setFeaturedProducts(featured);

      const uniqueCategories = [
        ...new Set(
          products.filter((p) => p.category).map((p) => p.category)
        ),
      ];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://amazon-clone-backend-1-s6de.onrender.com/api/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  const goToSlide = (index) => setCurrentSlide(index);

  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));
  const clearFilters = () =>
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      rating: "",
      sortBy: "featured",
    });

  const getFilteredProducts = (productList) => {
    let filtered = [...productList];
    if (filters.category)
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    if (filters.minPrice)
      filtered = filtered.filter(
        (product) => product.price >= parseInt(filters.minPrice)
      );
    if (filters.maxPrice)
      filtered = filtered.filter(
        (product) => product.price <= parseInt(filters.maxPrice)
      );
    if (filters.rating)
      filtered = filtered.filter(
        (product) => product.rating >= parseInt(filters.rating)
      );

    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      default:
        break;
    }
    return filtered;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex justify-center items-center flex-1">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
      <Navbar />

      {/* Hero Carousel */}
      <div className="relative h-[200px] sm:h-[280px] md:h-[400px] bg-gray-200 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full flex-shrink-0 relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute left-4 sm:left-12 top-1/2 transform -translate-y-1/2 text-white max-w-[240px] sm:max-w-md">
                <h1 className="text-sm sm:text-2xl font-bold mb-1 sm:mb-2">
                  {banner.title}
                </h1>
                <p className="text-xs sm:text-base mb-3">{banner.subtitle}</p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-1 sm:py-2 px-3 sm:px-6 rounded-md text-xs sm:text-sm">
                  {banner.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Filter Toggle (Mobile) */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-3 py-2 sticky top-0 z-40">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h18M3 12h18M3 20h18"
            />
          </svg>
          <span>{showFilters ? "Close Filters" : "Filters & Sort"}</span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row px-3 sm:px-5 py-4 sm:py-6 gap-4 sm:gap-6 relative">
        {/* Sidebar (Slide-in on mobile) */}
        {showFilters && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setShowFilters(false)}
          ></div>
        )}

        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 lg:static lg:translate-x-0 lg:block ${
            showFilters ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="text-base font-semibold">Filters</h3>
            <button
              className="lg:hidden text-gray-600 text-sm"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          <div className="p-4 overflow-y-auto h-[calc(100vh-64px)] lg:h-auto">
            {/* Sort */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Sort By</h4>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  handleFilterChange("sortBy", e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* Category */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Category</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto text-sm">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={filters.category === ""}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="text-yellow-400"
                  />
                  <span className="ml-2">All</span>
                </label>
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={filters.category === category}
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value)
                      }
                      className="text-yellow-400"
                    />
                    <span className="ml-2">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Price Range</h4>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) =>
                    handleFilterChange("minPrice", e.target.value)
                  }
                  className="w-1/2 border rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value)
                  }
                  className="w-1/2 border rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="text-sm font-medium mb-2">Customer Rating</h4>
              <div className="space-y-2 text-sm">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={filters.rating === rating.toString()}
                      onChange={(e) =>
                        handleFilterChange("rating", e.target.value)
                      }
                      className="text-yellow-400"
                    />
                    <span className="ml-2">
                      {"★".repeat(rating)}
                      <span className="text-gray-400">
                        {"★".repeat(5 - rating)}
                      </span>{" "}
                      & up
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Apply Filters (Mobile) */}
          <div className="lg:hidden p-4 border-t">
            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-lg font-medium"
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Products Section */}
        <main className="flex-1">
          {/* Featured */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-5">
              Featured Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
              {getFilteredProducts(featuredProducts).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>

          {/* Deals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-5">
              Today's Deals
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
              {getFilteredProducts(products.filter((p) => p.discount))
                .slice(0, 6)
                .map((product) => (
                  <div
                    key={product._id}
                    className="border border-gray-200 rounded-lg p-2 hover:shadow-md transition-shadow"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-28 sm:h-32 object-contain mb-2"
                    />
                    <span className="text-xs text-red-600 font-semibold">
                      {product.discount}% OFF
                    </span>
                    <h3 className="text-sm line-clamp-2 font-medium">
                      {product.name}
                    </h3>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sign In Section - Only shows on screens less than 600px */}
      <div className="sm:hidden bg-white border-t border-gray-200 sticky bottom-0 z-30">
        <div className="px-4 py-3">
          <div className="text-center mb-2">
            <p className="text-sm text-gray-600">
              See personalized recommendations
            </p>
          </div>
          <Link 
            to="/login"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-200 block text-center"
          >
            Sign in
          </Link>
          <div className="text-center mt-2">
            <span className="text-xs text-gray-500">
              New customer?{" "}
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-800 text-xs font-medium"
              >
                Start here.
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;