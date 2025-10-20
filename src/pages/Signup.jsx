import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 mt-5">
      {/* Amazon Logo */}
      <div className="flex items-center mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
          className="w-32"
        />
        <span className="text-sm text-gray-700 ml-1 relative -top-0.5">.in</span>
      </div>

      {/* Signup Card */}
      <div className="border border-gray-300 rounded-md w-full max-w-md bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">Create Account</h1>

        <form onSubmit={handleEmailSignup}>
          {/* Email */}
          <label className="text-sm font-semibold block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-400 rounded-sm p-2 mb-3 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            required
          />

          {/* Password */}
          <label className="text-sm font-semibold block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-400 rounded-sm p-2 mb-3 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            required
          />

          {/* Confirm Password */}
          <label className="text-sm font-semibold block mb-1">
            Re-enter Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-400 rounded-sm p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-medium py-2 rounded-sm"
          >
            Continue
          </button>
        </form>


        <div className="mt-4 text-sm">
          <p className="text-gray-800 font-semibold">Buying for work?</p>
          <Link to='/business-account' className="text-blue-600 hover:underline cursor-pointer">
            Create a free business account
          </Link>
        </div>

         <div className="flex-grow h-px bg-gray-300 mt-4"></div>

           {/* Already have account */}
      <div className="mt-4 text-sm text-gray-800">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </div>
      {/* Info Section */}
        <p className="text-xs text-gray-800 mt-4">
          By creating an account, you agree to Amazon's{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Conditions of Use
          </span>{" "}
          and{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Privacy Notice
          </span>
          .
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center w-full max-w-md mt-6">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="mx-2 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

    

      {/* Google Signup */}
      <button
        onClick={handleGoogleSignup}
        className="w-full max-w-md mt-3 flex items-center justify-center border border-gray-400 rounded-sm py-2 hover:bg-gray-100"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5 mr-2"
        />
        <span className="text-sm">Sign up with Google</span>
      </button>

     

      {/* Footer */}
      <footer className="mt-12 text-xs text-center">
        <div className="flex justify-center space-x-6 text-blue-600">
          <span className="hover:underline cursor-pointer">
            Conditions of Use
          </span>
          <span className="hover:underline cursor-pointer">
            Privacy Notice
          </span>
          <span className="hover:underline cursor-pointer">Help</span>
        </div>
        <p className="mt-2 text-gray-500">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </p>
      </footer>
    </div>
  );
};

export default Signup;
