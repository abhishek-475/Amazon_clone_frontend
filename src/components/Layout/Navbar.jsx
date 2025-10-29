import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountPopup from '../AccountPopup';
import DropKitchen from '../Menus/DropKitchen';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const cart = useSelector(state => state.cart);
  const cartItemsCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [showKitchenMenu, setShowKitchenMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [location, setLocation] = useState(localStorage.getItem('location') || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const accountRef = useRef(null);
  const popupRef = useRef(null);
  const kitchenRef = useRef(null);
  const kitchenMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const accountHoverTimeout = useRef(null);
  const kitchenHoverTimeout = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  const handleAccountMouseEnter = () => {
    if (accountHoverTimeout.current) clearTimeout(accountHoverTimeout.current);
    setShowAccountPopup(true);
  };

  const handleAccountMouseLeave = () => {
    accountHoverTimeout.current = setTimeout(() => setShowAccountPopup(false), 200);
  };

  const handleKitchenMouseEnter = () => {
    if (kitchenHoverTimeout.current) clearTimeout(kitchenHoverTimeout.current);
    setShowKitchenMenu(true);
  };

  const handleKitchenMouseLeave = () => {
    kitchenHoverTimeout.current = setTimeout(() => setShowKitchenMenu(false), 200);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  const saveLocation = () => {
    localStorage.setItem('location', location);
    setShowLocationInput(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="bg-[#131921] text-white sticky top-0 z-50">
        <div className="max-w-[1500px] mx-auto px-2 sm:px-3 lg:px-4">
          <div className="flex items-center h-14 gap-1 sm:gap-2 lg:gap-3 flex-wrap sm:flex-nowrap">

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 hover:border hover:border-white hover:rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link to="/" className="p-2 hover:border hover:border-white hover:rounded min-w-[80px] sm:min-w-[100px]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
                className="h-5 sm:h-6 w-auto pt-1 filter invert"
              />
            </Link>

            {/* Delivery Location (hidden on mobile) */}
            <div className="hidden md:flex items-center p-2 hover:border hover:border-white hover:rounded cursor-pointer relative">
              <div className="flex flex-col">
                <span className="text-xs text-gray-300 leading-3">Delivering to</span>
                <span
                  className="text-sm font-bold flex items-center gap-1"
                  onClick={() => setShowLocationInput(!showLocationInput)}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {location || 'Update location'}
                </span>
              </div>
              {showLocationInput && (
                <div className="absolute top-full left-0 mt-1 p-2 bg-white text-black rounded shadow-md z-50 min-w-[200px]">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city or pincode"
                    className="border border-gray-300 rounded p-1 text-sm w-full mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveLocation}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 text-sm rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowLocationInput(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 text-sm rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex flex-1 max-w-full sm:max-w-xl lg:max-w-2xl min-w-0">
              <div className="flex w-full h-9 sm:h-10">
                <select className="hidden sm:block bg-gray-100 text-gray-700 border border-gray-300 rounded-l-md px-2 py-1 text-xs focus:outline-none hover:bg-gray-200 border-r-0">
                  <option>All</option>
                  <option>Amazon Devices</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                </select>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Amazon.in"
                  className="flex-1 px-2 sm:px-3 py-1 border border-gray-300 focus:outline-none text-sm text-black w-full rounded-l-md sm:rounded-none"
                />
                <button 
                  type="submit"
                  className="bg-[#febd69] hover:bg-[#f3a847] text-gray-900 rounded-r-md px-2 sm:px-3 lg:px-4 transition-colors min-w-[40px]"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Mobile Location (shown only on mobile) */}
            <div className="md:hidden flex items-center p-2 hover:border hover:border-white hover:rounded cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Account & Lists */}
            <div
              ref={accountRef}
              className="hidden sm:block relative"
              onMouseEnter={handleAccountMouseEnter}
              onMouseLeave={handleAccountMouseLeave}
            >
              <div className="flex flex-col p-2 hover:border hover:border-white hover:rounded cursor-pointer min-w-[80px]">
                <span className="text-xs truncate">
                  Hello, {user ? user.displayName || user.email.split('@')[0] : 'Sign in'}
                </span>
                <span className="text-sm font-bold">Account & Lists</span>
              </div>

              {showAccountPopup && (
                <div
                  ref={popupRef}
                  className="absolute top-full right-0 mt-1 z-50"
                  onMouseEnter={handleAccountMouseEnter}
                  onMouseLeave={handleAccountMouseLeave}
                >
                  <AccountPopup user={user} handleSignOut={handleSignOut} />
                </div>
              )}
            </div>

            {/* Returns & Orders (hidden on mobile) - Now redirects to Your Orders page */}
            <Link 
              to="/your-orders" 
              className="hidden sm:flex flex-col p-2 hover:border hover:border-white hover:rounded cursor-pointer"
            >
              <span className="text-xs">Returns</span>
              <span className="text-sm font-bold">& Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="flex items-center p-2 hover:border hover:border-white hover:rounded cursor-pointer">
              <div className="relative">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m5.5 0a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span className="absolute top-0 -right-1 bg-[#f08804] text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                  {cartItemsCount}
                </span>
              </div>
              <span className="hidden lg:block text-sm font-bold mt-4 ml-1">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Bar - Hidden on mobile */}
      <div className="hidden lg:block bg-[#232f3e] text-white sticky top-14 z-40">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="flex items-center h-10 text-sm overflow-x-auto scrollbar-hide whitespace-nowrap">

            {/* All Menu */}
            <div className="flex items-center p-2 hover:border hover:border-white hover:rounded cursor-pointer whitespace-nowrap">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-bold">All</span>
            </div>

            {/* Navigation Links */}
            {['Fresh','Amazon miniTV','Sell','Best Sellers',"Today's Deals","Mobiles","Electronics","Prime","Fashion","New Releases"].map(link => (
              <Link 
                key={link} 
                to="#" 
                className="p-2 hover:border hover:border-white hover:rounded cursor-pointer whitespace-nowrap"
              >
                {link}
              </Link>
            ))}

            {/* Home & Kitchen Mega Menu */}
            <div
              ref={kitchenRef}
              className="relative"
              onMouseEnter={handleKitchenMouseEnter}
              onMouseLeave={handleKitchenMouseLeave}
            >
              <div className="p-2 hover:border hover:border-white hover:rounded cursor-pointer whitespace-nowrap">
                Home & Kitchen
              </div>
              {showKitchenMenu && (
                <div
                  ref={kitchenMenuRef}
                  className="absolute top-full left-0 z-50"
                  onMouseEnter={handleKitchenMouseEnter}
                  onMouseLeave={handleKitchenMouseLeave}
                >
                  <DropKitchen />
                </div>
              )}
            </div>

            {['Amazon Pay','Computers','Books','Customer Service'].map(link => (
              <Link 
                key={link} 
                to="#" 
                className="p-2 hover:border hover:border-white hover:rounded cursor-pointer whitespace-nowrap"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div 
            ref={mobileMenuRef}
            className="fixed left-0 top-0 h-full w-80 bg-white text-black overflow-y-auto"
          >
            {/* Mobile Menu Header */}
            <div className="bg-[#232f3e] text-white p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-400 rounded-full mr-3"></div>
                  <div>
                    <div className="text-sm font-bold">Hello, {user ? user.displayName || user.email.split('@')[0] : 'Sign in'}</div>
                  </div>
                </div>
                <button 
                  onClick={toggleMobileMenu}
                  className="text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Mobile Menu Content */}
            <div className="p-4">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-bold text-lg mb-2">Trending</h3>
                  <div className="space-y-2">
                    {['Best Sellers', "Today's Deals", 'New Releases', 'Movers & Shakers'].map(item => (
                      <Link key={item} to="#" className="block py-2 text-gray-700 hover:text-orange-600">
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-bold text-lg mb-2">Digital Content & Devices</h3>
                  <div className="space-y-2">
                    {['Amazon miniTV', 'Echo & Alexa', 'Fire TV', 'Kindle', 'Audible'].map(item => (
                      <Link key={item} to="#" className="block py-2 text-gray-700 hover:text-orange-600">
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-bold text-lg mb-2">Shop By Category</h3>
                  <div className="space-y-2">
                    {['Mobiles & Accessories', 'Electronics', 'Fashion', 'Home & Kitchen', 'Books'].map(item => (
                      <Link key={item} to="#" className="block py-2 text-gray-700 hover:text-orange-600">
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-bold text-lg mb-2">Programs & Features</h3>
                  <div className="space-y-2">
                    {['Amazon Pay', 'Gift Cards', 'Amazon Business', 
                      <Link key="your-orders" to="/your-orders" className="text-gray-700 hover:text-orange-600">
                        Your Orders
                      </Link>
                    ].map((item, index) => (
                      <div key={index} className="block py-2">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Help & Settings</h3>
                  <div className="space-y-2">
                    <Link to="/your-account" className="block py-2 text-gray-700 hover:text-orange-600">
                      Your Account
                    </Link>
                    <Link to="/customer-service" className="block py-2 text-gray-700 hover:text-orange-600">
                      Customer Service
                    </Link>
                    {user ? (
                      <button 
                        onClick={handleSignOut}
                        className="block py-2 text-gray-700 hover:text-orange-600"
                      >
                        Sign Out
                      </button>
                    ) : (
                      <Link to="/login" className="block py-2 text-gray-700 hover:text-orange-600">
                        Sign In
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;