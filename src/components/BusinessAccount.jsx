import React from 'react';
import { Link,useNavigate  } from 'react-router-dom';

const BusinessAccount = () => {
        const navigate = useNavigate();


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-[#232f3e]">
                <div className="max-w-6xl mx-auto px-5">
                    {/* Header with Amazon Logo + Business and Progress Steps */}
                    <div className="flex items-center justify-between py-4">
                        {/* Amazon Logo + Business Text (left end) */}
                        <div className="flex items-center gap-3 bg-[#232f3e] p-2">
                            <Link to="/">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                                    alt="Amazon"
                                    className="h-6 filter invert"
                                />
                            </Link>
                            <span className="text-white text-lg font-semibold tracking-tight">
                                Business
                            </span>
                        </div>

                        {/* Progress Steps (right end, equally spaced) */}
                        <div className="flex justify-between w-72"> {/* adjust width as needed */}
                            {/* Step 1 */}
                            <div className="flex flex-col items-center">
                                <div className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xs font-bold">
                                    1
                                </div>
                                <span className="text-xs mt-1 text-white text-center">Account creation</span>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center">
                                <div className="w-6 h-6 rounded-full bg-gray-400 text-black flex items-center justify-center text-xs font-bold">
                                    2
                                </div>
                                <span className="text-xs mt-1 text-white text-center">Business details</span>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center">
                                <div className="w-6 h-6 rounded-full bg-gray-400 text-black flex items-center justify-center text-xs font-bold">
                                    3
                                </div>
                                <span className="text-xs mt-1 text-white text-center">Finish</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-lg">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Progress Steps */}
                    {/* <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">business account password</h1>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">1</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">amazon business</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">2</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">ACCOUNT CREATION</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">3</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">BUSINESS DETAILS</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">4</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">FINISH</span>
              </div>
            </div>
          </div> */}

                    {/* Form Section */}
                    <div className="mb-6">
                        <h2 className="text-lg font-medium text-gray-800 mb-4">
                            Enter your full name and choose your business password
                        </h2>

                        {/* Name Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Mobile Number Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile numbers</label>
                            <input
                                type="tel"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter mobile number"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Create password"
                            />
                            <p className="text-xs text-gray-500 mt-1">Passwords must be at least 6 characters.</p>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password again</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Re-enter password"
                            />
                        </div>

                        {/* Next Button */}
                        <button onClick={navigate('/')} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-md shadow-sm transition duration-200">
                            Next step
                        </button>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="text-xs text-gray-600 border-t border-gray-200 pt-4">
                        <p>
                            By creating an account or logging in, you agree to Amazon's{' '}
                            <a href="#" className="text-blue-600 hover:underline">Conditions of Use</a>,{' '}
                            <a href="#" className="text-blue-600 hover:underline">Privacy Notice</a>, and the{' '}
                            <a href="#" className="text-blue-600 hover:underline">Amazon Business Terms and Conditions</a>.
                            You agree that you are creating this business account on behalf of your organization and have authority to bind your organization.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BusinessAccount;