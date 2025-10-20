import React from 'react';
import { Link } from 'react-router-dom';

const AccountPopup = ({ user, handleSignOut }) => {
  const accountSections = [
    {
      title: "Your Lists",
      items: [
        { name: "Create a Wish List", path: "/wishlist" },
        { name: "Find a Wish List", path: "/wishlist/find" },
        { name: "Wish from Any Website", path: "/wishlist/anywhere" },
      ]
    },
    {
      title: "Your Account",
      items: [
        { name: "Account", path: "/your-account" },
        { name: "Orders", path: "/your-orders" },
        { name: "Recommendations", path: "/recommendations" },
        { name: "Browsing History", path: "/browsing-history" },
        { name: "Watchlist", path: "/watchlist" },
        { name: "Video Purchases & Rentals", path: "/video-library" },
        { name: "Kindle Unlimited", path: "/kindle-unlimited" },
        { name: "Content & Devices", path: "/content-devices" },
        { name: "Subscribe & Save Items", path: "/subscribe-save" },
        { name: "Memberships & Subscriptions", path: "/memberships" },
        { name: "Music Library", path: "/music-library" },
      ]
    }
  ];

  return (
    <div className="absolute top-full left-0 w-80 bg-white border border-gray-200 rounded shadow-lg z-[60]">
      <div className="max-h-96 overflow-y-auto">
        {/* Sign in / Sign out Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="flex-1">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="block w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-medium text-gray-900 py-1 px-3 rounded border border-yellow-500 text-center transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="block w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-medium text-gray-900 py-1 px-3 rounded border border-yellow-500 text-center transition-colors"
                  >
                    Sign In
                  </Link>
                  <p className="text-xs text-gray-600 mt-2">
                    New customer?{' '}
                    <Link to="/signup" className="text-blue-600 hover:text-orange-700 hover:underline">
                      Start here.
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Account Sections */}
        {user && (
          <div className="p-4">
            <div className="space-y-6">
              {accountSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
                    {section.title}
                  </h4>
                  <ul className="space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link 
                          to={item.path}
                          className="block py-1 px-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Links */}
        {user && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <h5 className="font-bold text-gray-900 mb-2">Help & Settings</h5>
                <ul className="space-y-1">
                  <li>
                    <Link to="/help" className="text-blue-600 hover:text-orange-700 hover:underline">
                      Your Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/customer-service" className="text-blue-600 hover:text-orange-700 hover:underline">
                      Customer Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPopup;
