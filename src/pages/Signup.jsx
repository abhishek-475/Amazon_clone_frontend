import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await fetch("https://amazon-clone-backend-1-s6de.onrender.com/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName || "Anonymous",
          email: user.email,
          googleId: user.uid,
          authProvider: "google",
        }),
      });

      navigate("/"); // redirect to home
    } catch (err) {
      console.error("Google signup failed:", err);
      setError("Google signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      await fetch("https://amazon-clone-backend-1-s6de.onrender.com/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName || "Anonymous",
          email: user.email,
          googleId: "",
          authProvider: "email",
        }),
      });

      navigate("/"); // redirect to home
    } catch (err) {
      console.error("Email signup failed:", err);
      setError("Signup failed. Try another email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 mt-5">
      {/* Logo */}
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

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleEmailSignup}>
          <label className="text-sm font-semibold block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-400 rounded-sm p-2 mb-3 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            required
          />

          <label className="text-sm font-semibold block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-400 rounded-sm p-2 mb-3 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            required
          />

          <label className="text-sm font-semibold block mb-1">Re-enter Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-400 rounded-sm p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? "bg-gray-400" : "bg-yellow-400 hover:bg-yellow-500"} text-sm font-medium py-2 rounded-sm transition-colors`}
          >
            {loading ? "Creating Account..." : "Continue"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-800">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center w-full max-w-md mt-6">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="mx-2 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Google Signup */}
      <button
        onClick={handleGoogleAuth}
        disabled={loading}
        className={`w-full max-w-md mt-3 flex items-center justify-center border border-gray-400 rounded-sm py-2 hover:bg-gray-100`}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5 mr-2"
        />
        <span className="text-sm">{loading ? "Signing up..." : "Sign up with Google"}</span>
      </button>
    </div>
  );
};

export default Signup;
