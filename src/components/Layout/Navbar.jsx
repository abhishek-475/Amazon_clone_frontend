import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountPopup from '../AccountPopup';
import DropKitchen from '../Menus/DropKitchen';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const cart = useSelector(state => state.cart);
  const cartItemsCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [showKitchenMenu, setShowKitchenMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [location, setLocation] = useState(localStorage.getItem('location') || '');

  const accountRef = useRef(null);
  const popupRef = useRef(null);
  const kitchenRef = useRef(null);
  const kitchenMenuRef = useRef(null);

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

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="bg-[#131921] text-white sticky top-0 z-50">
        <div className="max-w-[1500px] mx-auto px-2 sm:px-4">
          <div className="flex items-center h-14 gap-2 flex-wrap sm:flex-nowrap">

            {/* Logo */}
            <Link to="/" className="p-2 hover:border hover:border-white hover:rounded">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
                className="h-6 w-auto pt-1 filter invert"
              />
            </Link>

            {/* Delivery Location (hidden <600px) */}
            <div className="hidden sm:flex items-center p-2 hover:border hover:border-white hover:rounded cursor-pointer relative">
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
                <div className="absolute top-full left-0 mt-1 p-2 bg-white text-black rounded shadow-md z-50">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city or pincode"
                    className="border border-gray-300 rounded p-1 text-sm w-40 sm:w-48"
                  />
                  <button
                    onClick={saveLocation}
                    className="ml-2 bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 text-sm rounded"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex flex-1 max-w-full sm:max-w-2xl">
              <div className="flex w-full h-10">
                <select className="hidden sm:block bg-gray-100 text-gray-700 border border-gray-300 rounded-l-md px-2 py-1 text-xs focus:outline-none hover:bg-gray-200 border-r-0">
                  <option>All</option>
                  <option>Amazon Devices</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                </select>
                <input
                  type="text"
                  placeholder="Search Amazon.in"
                  className="flex-1 px-2 sm:px-3 py-1 border border-gray-300 focus:outline-none text-sm text-black w-full rounded-md sm:rounded-none sm:rounded-l-md"
                />
                <button className="bg-[#febd69] hover:bg-[#f3a847] text-gray-900 rounded-r-md px-3 sm:px-4 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Account & Lists */}
            <div
              ref={accountRef}
              className="hidden sm:block relative"
              onMouseEnter={handleAccountMouseEnter}
              onMouseLeave={handleAccountMouseLeave}
            >
              <div className="flex flex-col p-2 hover:border hover:border-white hover:rounded cursor-pointer">
                <span className="text-xs">
                  Hello, {user ? user.displayName || user.email : 'Sign in'}
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

            {/* Returns & Orders (hidden <600px) */}
            <div className="hidden sm:flex flex-col p-2 hover:border hover:border-white hover:rounded cursor-pointer">
              <span className="text-xs">Returns</span>
              <span className="text-sm font-bold">& Orders</span>
            </div>

            {/* Cart */}
            <Link to="/cart" className="flex items-center p-2 hover:border hover:border-white hover:rounded cursor-pointer">
              <div className="relative">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m5.5 0a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span className="absolute top-0 -right-1 bg-[#f08804] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Bar */}
      <div className="bg-[#232f3e] text-white sticky top-14 z-40">
        <div className="max-w-[1500px] mx-auto px-2 sm:px-4">
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
              <Link key={link} to="#" className="p-2 hover:border hover:border-white hover:rounded cursor-pointer whitespace-nowrap">
                {link}
              </Link>
            ))}

            {/* Home & Kitchen Mega Menu */}
            <div
              ref={kitchenRef}
              className="hidden sm:block relative"
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
              <Link key={link} to="#" className="p-2 hover:border hover:border-white hover:rounded cursor-pointer whitespace-nowrap">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
