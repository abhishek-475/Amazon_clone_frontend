import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  removeFromCart,
  updateQuantity,
  clearCart,
  addToCart
} from "../store/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [giftItems, setGiftItems] = useState({}); // Track gift checkboxes
  const [savedForLater, setSavedForLater] = useState([]); // Store saved items

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity === 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const calculateSubtotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Format price in INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleGiftToggle = (id) => {
    setGiftItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveForLater = (item) => {
    setSavedForLater((prev) => [...prev, item]);
    dispatch(removeFromCart(item._id));
  };

  const handleCompare = (item) => {
    navigate(`/product/${item._id}`); // Redirect to product details
  };

  const handleShare = async (item) => {
    const productUrl = `${window.location.origin}/product/${item._id}`;
    try {
      await navigator.clipboard.writeText(productUrl);
      alert(`Link copied: ${productUrl}`);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };


  const handleMoveToCart = (item) => {
  // 1️⃣ Add item back to cart
  dispatch(addToCart({ ...item, quantity: 1 }));

  // 2️⃣ Remove it from the saved list
  setSavedForLater((prev) => prev.filter((saved) => saved._id !== item._id));

  // 3️⃣ Optional: persist saved list (if using localStorage)
  // localStorage.setItem("savedForLater", JSON.stringify(updatedList));

  // ✅ No need to reload page — Redux re-renders automatically
};



  if (cart.items.length === 0 && savedForLater.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 pt-20 text-center">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m5.5 0a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z"
            />
          </svg>
          <h1 className="text-2xl font-normal text-gray-900 mb-4">
            Your Amazon Cart is empty
          </h1>
          <p className="text-gray-600 mb-6">
            Continue shopping on the{" "}
            <Link
              to="/"
              className="text-blue-600 hover:text-orange-700 hover:underline"
            >
              Amazon.in homepage
            </Link>
            .
          </p>
          <Link
            to="/"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-8 rounded-md border border-yellow-400 shadow-sm"
          >
            Shop today's deals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 pt-20">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-normal text-gray-900">Shopping Cart</h1>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-600">
              {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""}
            </p>
            <button
              onClick={() => dispatch(clearCart())}
              className="text-sm text-blue-600 hover:text-orange-700 hover:underline"
            >
              Deselect all items
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 border border-gray-300 rounded-md">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-300 flex justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Items in your cart ({getTotalItems()})
              </h2>
              <span className="text-sm text-gray-600">Price</span>
            </div>

            <div className="divide-y divide-gray-300">
              {cart.items.map((item) => (
                <div key={item._id} className="p-4 flex gap-4">
                  <img
                    src={item.images?.[0] || item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain border border-gray-200 rounded"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg text-blue-600 hover:text-orange-700 hover:underline cursor-pointer line-clamp-2">
                          {item.name}
                        </h3>

                        <p className="text-green-600 text-sm font-semibold mt-1">
                          In Stock
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          FREE delivery <strong>Tomorrow</strong>
                        </p>

                        {/* Gift checkbox */}
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={giftItems[item._id] || false}
                              onChange={() => handleGiftToggle(item._id)}
                              className="mr-2 w-4 h-4 text-blue-600"
                            />
                            <span className="text-gray-600">This is a gift</span>
                            <span className="text-blue-600 hover:text-orange-700 hover:underline ml-1 cursor-pointer">
                              Learn more
                            </span>
                          </label>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 mt-4 flex-wrap">
                          <div className="flex items-center">
                            <label
                              htmlFor={`quantity-${item._id}`}
                              className="text-sm text-gray-600 mr-2"
                            >
                              Qty:
                            </label>
                            <select
                              id={`quantity-${item._id}`}
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item._id,
                                  parseInt(e.target.value)
                                )
                              }
                              className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                            >
                              {[...Array(10)].map((_, num) => (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Item Actions */}
                          <div className="flex items-center gap-2 text-sm">
                            <button
                              onClick={() => dispatch(removeFromCart(item._id))}
                              className="text-blue-600 hover:text-orange-700 hover:underline"
                            >
                              Delete
                            </button>

                            <span className="text-gray-300">|</span>

                            <button
                              onClick={() => handleSaveForLater(item)}
                              className="text-blue-600 hover:text-orange-700 hover:underline"
                            >
                              Save for later
                            </button>

                            <span className="text-gray-300">|</span>

                            <button
                              onClick={() => handleCompare(item)}
                              className="text-blue-600 hover:text-orange-700 hover:underline"
                            >
                              Compare with similar items
                            </button>

                            <span className="text-gray-300">|</span>

                            <button
                              onClick={() => handleShare(item)}
                              className="text-blue-600 hover:text-orange-700 hover:underline"
                            >
                              Share
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-right ml-4">
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 px-4 py-3 border-t border-gray-300 text-right">
              <span className="text-lg font-bold text-gray-900">
                Subtotal ({getTotalItems()} item
                {getTotalItems() !== 1 ? "s" : ""}):{" "}
                {formatPrice(calculateSubtotal())}
              </span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="border border-gray-300 rounded-md p-4 sticky top-24">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center text-green-600 text-sm mb-2">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Your order is eligible for FREE Delivery</span>
                </div>
              </div>

              <strong className="text-lg block mb-4 text-gray-900 text-center">
                Subtotal ({getTotalItems()} item
                {getTotalItems() !== 1 ? "s" : ""}):{" "}
                {formatPrice(calculateSubtotal())}
              </strong>

              <Link
                to="/checkout"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-md border border-yellow-400 shadow-sm text-center block"
              >
                Proceed to Buy
              </Link>
            </div>
          </div>
        </div>

        {/* Saved for Later Section */}
        {savedForLater.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Saved for Later
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedForLater.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-md p-4"
                >
                  <img
                    src={item.images?.[0] || item.image}
                    alt={item.name}
                    className="w-full h-40 object-contain mb-3"
                  />
                  <h4 className="text-blue-600 line-clamp-2 mb-1">
                    {item.name}
                  </h4>
                  <p className="text-gray-900 font-bold mb-3">
                    {formatPrice(item.price)}
                  </p>
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-1 px-4 rounded-md border border-yellow-400 text-sm font-medium"
                  >
                    Move to Cart
                  </button>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
