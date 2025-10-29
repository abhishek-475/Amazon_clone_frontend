import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const cartItemsCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  const user = useSelector((state) => state.auth.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [location, setLocation] = useState(localStorage.getItem('location') || 'India');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const saveLocation = () => {
    localStorage.setItem('location', location);
    setShowLocationInput(false);
  };

  return (
    <header className="bg-[#131921] sticky top-0 z-50 text-white">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between px-2 sm:px-4 py-2 flex-wrap sm:flex-nowrap">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center min-w-[100px] hover:outline hover:outline-1 hover:outline-white rounded-sm p-1"
        >
          <span className="text-2xl font-bold lowercase tracking-tight text-white">
            amazon
          </span>
          <span className="text-xs text-gray-300 ml-1 self-end">.in</span>
        </Link>

        {/* Delivery Location */}
        <div className="hidden sm:flex flex-col cursor-pointer px-2 hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 relative">
          <div 
            className="flex flex-col"
            onClick={() => setShowLocationInput(!showLocationInput)}
          >
            <span className="text-xs text-gray-300 flex items-center">
              <i className="fas fa-map-marker-alt text-gray-400 mr-1"></i>
              Deliver to
            </span>
            <span className="text-sm font-semibold text-white flex items-center">
              {location}
            </span>
          </div>
          
          {/* Location Input Popup */}
          {showLocationInput && (
            <div className="absolute top-full left-0 mt-1 p-3 bg-white text-black rounded shadow-lg z-50 w-64">
              <h3 className="font-semibold mb-2">Choose your location</h3>
              <p className="text-sm text-gray-600 mb-3">Select a delivery location to see product availability and delivery options</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <div className="flex gap-2">
                <button
                  onClick={saveLocation}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 text-sm rounded font-medium"
                >
                  Apply
                </button>
                <button
                  onClick={() => setShowLocationInput(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-black px-3 py-2 text-sm rounded font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center flex-1 mx-2 sm:mx-4 max-w-full sm:max-w-2xl">
          <div className="hidden sm:flex items-center bg-white rounded-l-md h-10 px-2 border-r border-gray-300 cursor-pointer hover:bg-gray-100">
            <span className="text-gray-600 text-sm">All</span>
            <i className="fas fa-chevron-down text-gray-400 text-xs ml-1"></i>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none border-none px-2 sm:px-3 text-black text-sm h-10 w-full rounded-md sm:rounded-none sm:rounded-l-md focus:ring-2 focus:ring-yellow-400"
            placeholder="Search Amazon.in"
          />
          <button 
            type="submit"
            className="bg-[#febd69] hover:bg-[#f3a847] transition-colors duration-200 w-10 sm:w-12 h-10 flex items-center justify-center cursor-pointer rounded-r-md"
          >
            <i className="fas fa-search text-gray-900 text-base"></i>
          </button>
        </form>

        {/* Language Selector */}
        <div className="hidden sm:flex items-center cursor-pointer px-2 hover:outline hover:outline-1 hover:outline-white rounded-sm p-1">
          <img 
            src="https://flagcdn.com/w20/in.png" 
            alt="India" 
            className="w-5 h-3 mr-1"
          />
          <span className="text-sm font-semibold text-white">EN</span>
          <i className="fas fa-chevron-down text-gray-400 text-xs ml-1"></i>
        </div>

        {/* Account & Lists */}
        <div className="flex flex-col cursor-pointer px-2 hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 text-center sm:text-left">
          <span className="text-xs text-gray-300">
            {user ? `Hello, ${user.name}` : "Hello, sign in"}
          </span>
          <div className="flex items-center justify-center sm:justify-start">
            <span className="text-sm font-semibold text-white">Account & Lists</span>
            <i className="fas fa-chevron-down text-gray-400 text-xs ml-1"></i>
          </div>
        </div>

        {/* Returns & Orders - Now redirects to Your Orders page */}
        <Link 
          to="/your-orders" 
          className="flex flex-col cursor-pointer px-2 hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 text-center sm:text-left"
        >
          <span className="text-xs text-gray-300">Returns</span>
          <span className="text-sm font-semibold text-white">& Orders</span>
        </Link>

        {/* Cart */}
        <Link 
          to="/cart" 
          className="flex items-center px-2 hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 relative"
        >
          <div className="relative">
            <i className="fas fa-shopping-cart text-3xl text-white"></i>
            <span className="absolute top-0 -right-1 bg-[#f08804] text-black font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          </div>
          <span className="text-sm font-semibold text-white mt-4 hidden sm:block">Cart</span>
        </Link>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-[#232f3e] py-1 px-2 sm:px-4 overflow-x-auto">
        <div className="max-w-[1500px] mx-auto flex items-center gap-2 sm:gap-4 text-sm whitespace-nowrap">
          <div className="flex items-center cursor-pointer hover:outline hover:outline-1 hover:outline-white rounded-sm px-2 py-1">
            <i className="fas fa-bars mr-1"></i>
            <span>All</span>
          </div>
          <Link to="/today-deals" className="hover:outline hover:outline-1 hover:outline-white rounded-sm px-2 py-1">
            Today's Deals
          </Link>
          <Link to="/customer-service" className="hover:outline hover:outline-1 hover:outline-white rounded-sm px-2 py-1">
            Customer Service
          </Link>
          <Link to="/registry" className="hover:outline hover:outline-1 hover:outline-white rounded-sm px-2 py-1">
            Registry
          </Link>
          <Link to="/gift-cards" className="hover:outline hover:outline-1 hover:outline-white rounded-sm px-2 py-1">
            Gift Cards
          </Link>
          <Link to="/sell" className="hover:outline hover:outline-1 hover:outline-white rounded-sm px-2 py-1">
            Sell
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;