import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const navigate = useNavigate()

    const handleOtpChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handleResendOtp = () => {
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        document.getElementById('otp-0').focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length === 6) {
            console.log('OTP submitted:', otpValue);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Amazon Business Header with Progress Steps */}
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
            <div className="max-w-6xl mx-auto px-5 py-8">
                <div className="flex justify-center">
                    <div className="w-full max-w-md border border-gray-300 rounded-lg bg-white p-8 shadow-sm">
                        <h1 className="text-3xl font-normal mb-6 text-gray-900">Verify email address</h1>

                        <p className="text-sm text-gray-900 mb-6 leading-5">
                            To verify your email, we've sent a One Time Password (OTP) to{" "}
                            <strong>jagdishmandhalkar1308@gmail.com</strong>
                            <a href="#" className="text-blue-600 hover:text-orange-700 hover:underline ml-1 text-sm">
                                (Change)
                            </a>
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2 text-gray-900">
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6} // or however many digits
                                    className="w-full h-12 border border-gray-400 rounded text-center text-lg font-bold"
                                />

                            </div>

                            <button
                                type="submit"
                                onClick={navigate('/business-account')}
                                className="w-full bg-gradient-to-b from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 border border-yellow-400 border-b-yellow-500 rounded text-sm font-normal py-2 mb-6 transition-colors"
                            >
                                Create your Amazon account
                            </button>
                        </form>


                        <div className="border-t border-gray-300 pt-6 mb-6">
                            <p className="text-xs text-gray-900 leading-5">
                                By creating an account or logging in, you agree to Amazon's{" "}
                                <a href="#" className="text-blue-600 hover:text-orange-700 hover:underline">Conditions of Use</a>,{" "}
                                <a href="#" className="text-blue-600 hover:text-orange-700 hover:underline">Privacy Notice</a>, and the{" "}
                                <a href="#" className="text-blue-600 hover:text-orange-700 hover:underline">Amazon Business Terms and Conditions</a>.
                                You agree that you are creating this business account on behalf of your
                                organization and have authority to bind your organization.
                            </p>
                        </div>

                        <div className="border-t border-gray-300 pt-4 text-center">
                            {canResend ? (
                                <button
                                    onClick={handleResendOtp}
                                    className="text-blue-600 hover:text-orange-700 hover:underline text-sm bg-transparent border-none cursor-pointer"
                                >
                                    Resend OTP
                                </button>
                            ) : (
                                <p className="text-gray-600 text-sm">
                                    Resend OTP in {timer} seconds
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-300 mt-8 pt-6">
                <div className="max-w-6xl mx-auto px-5">
                    <div className="flex justify-center gap-6 mb-3">
                        <a href="#" className="text-blue-600 hover:text-orange-700 hover:underline text-xs">
                            Conditions of Use
                        </a>
                        <a href="#" className="text-blue-600 hover:text-orange-700 hover:underline text-xs">
                            Privacy Notice
                        </a>
                        <a href="#" className="text-blue-600 hover:text-orange-700 hover:underline text-xs">
                            Help
                        </a>
                    </div>
                    <div className="text-center text-gray-600 text-xs">
                        © 1996-2024, Amazon.com, Inc. or its affiliates
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;