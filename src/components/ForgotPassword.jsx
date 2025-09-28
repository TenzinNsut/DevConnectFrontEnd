import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const ForgotPassword = () => {
    const [emailId, setEmailId] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailRequest = async (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        setError("");
        setSuccessMessage("");
        setIsLoading(true);

        try {
            if (!emailId.trim()) {
                setError("Email address is required");
                return;
            }
            await axios.post(
                BASE_URL + "/forgot-password",
                { emailId },
                {}
            );

            setSuccessMessage("Password reset link sent to your email! You will be redirected to reset page in 10 seconds");
            // Redirect to reset password page after 10 seconds
            setTimeout(() => {
                navigate('/reset-password')
            }, 10000);

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong!");
            console.error("Forgot password error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-3">Forgot Password?</h1>
                    <p className="text-gray-400 leading-relaxed">
                        No worries, we'll send you reset instructions to get you back into your DevConnect account.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-800">
                    <form onSubmit={handleEmailRequest} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={emailId}
                                onChange={(event) => setEmailId(event.target.value)}
                                required
                                autoComplete="email"
                                placeholder="Enter your email address"
                                className="w-full rounded-lg bg-gray-800/50 border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors placeholder-gray-500"
                            />
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
                                <p className="text-red-400 text-sm text-center">{error}</p>
                            </div>
                        )}
                        
                        {successMessage && (
                            <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <p className="text-green-400 text-sm leading-relaxed">{successMessage}</p>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                        >
                            

                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </button>

                        {/* Back to Login */}
                        <div className="text-center pt-4">
                            <p className="text-gray-400 text-sm">
                                Remember your password?{' '}
                                <Link
                                    to="/login"
                                    className="font-semibold text-green-400 hover:text-green-300 transition-colors"
                                >
                                    Back to Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Additional Help */}
                <div className="text-center mt-6">
                    <p className="text-gray-500 text-xs">
                        Need more help? Contact our support team for assistance.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;