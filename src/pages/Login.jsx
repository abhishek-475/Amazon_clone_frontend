import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  signInWithEmailAndPassword, 
  signInWithRedirect, 
  getRedirectResult 
} from "firebase/auth";
import { auth, googleProvider } from "../firebase"; 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle Google redirect result
useEffect(() => {
  getRedirectResult(auth)
    .then((result) => {
      if (result) {
        navigate("/");
      }
    })
    .catch((error) => console.error(error));
}, [navigate]);


  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async() => {
    try {
    const result = await signInWithPopup(auth, googleProvider);
    // Optional: const user = result.user;
    navigate("/"); // only navigate after successful login
  } catch (error) {
    alert(error.message);
  }
  };

  return (
    <div className="flex flex-col items-center mt-10 font-sans">
      {/* Amazon Logo */}
      <div className="flex items-end mb-6">
        <Link to="/" className="flex items-end">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
            className="w-32"
          />
          <span className="text-sm text-gray-700 mb-1 ml-1">.in</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="border border-gray-300 rounded-md w-96 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

        <form onSubmit={handleEmailLogin}>
          <label className="text-sm font-semibold block mb-1">
            Email or mobile phone number
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-400 rounded-sm p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-medium py-2 rounded-sm"
          >
            Continue
          </button>
        </form>

        <p className="text-xs text-gray-700 mt-4">
          By continuing, you agree to Amazon's{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Notice
          </a>.
        </p>

        <details className="text-sm mt-3 cursor-pointer">
          <summary className="text-blue-700 hover:underline">Need help?</summary>
          <ul className="ml-4 mt-1 text-blue-600 text-sm list-disc">
            <li>Forgot password</li>
            <li>Other issues with Sign-In</li>
          </ul>
        </details>

        <hr className="my-4" />
        <div className="text-sm">
          <p className="text-gray-800 font-semibold">Buying for work?</p>
          <button
            onClick={() => navigate("/verify")}
            className="text-blue-600 hover:underline"
          >
            Shop on Amazon Business
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center w-96 mt-6">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="mx-2 text-gray-500 text-sm">New to Amazon?</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Create Account */}
      <Link
        to="/signup"
        className="border border-gray-400 bg-gray-50 hover:bg-gray-100 text-sm w-96 mt-3 py-2 rounded-sm text-center"
      >
        Create your Amazon account
      </Link>

      {/* OR Google Login */}
      <div className="w-96 mt-4 text-center">
        <div className="flex items-center justify-center">
          <div className="h-px bg-gray-300 w-full"></div>
          <span className="text-gray-500 mx-2 text-sm">or</span>
          <div className="h-px bg-gray-300 w-full"></div>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-3 flex items-center justify-center border border-gray-400 rounded-sm py-2 hover:bg-gray-100"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          <span className="text-sm">Login with Google</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-xs text-gray-500 text-center">
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:underline">
            Conditions of Use
          </a>
          <a href="#" className="hover:underline">
            Privacy Notice
          </a>
          <a href="#" className="hover:underline">
            Help
          </a>
        </div>
        <p className="mt-2">© 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </footer>
    </div>
  );
};

export default Login;
