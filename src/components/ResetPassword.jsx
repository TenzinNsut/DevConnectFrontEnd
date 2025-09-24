import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import validator from "validator";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [showResetToken, setShowResetToken] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isValidPassowrd = (pwd) => {
        return validator.isStrongPassword(pwd, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        });
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(false);
        // Validate password
        if (newPassword !== confirmPassword) {
            setError("Password do not match");
            setIsLoading(false);
            return;
        }

        if (!isValidPassowrd(newPassword)) {
            setError("Password must be at least 8 characters and include atleast 1 uppercase, 1 lowercase, 1 number, and 1 special character like @,#,$");
            setIsLoading(false);
            return;
        }
        try {
            await axios.patch(
                BASE_URL + "/reset-password",
                { resetToken, newPassword },
                { withCredentials: true }
            );

            setSuccessMessage('Password reset successfull! Redirecting to login page');

            setTimeout(() => {
                navigate("/login");
            }, 5000)

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong!");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-3">Reset Your Password</h1>
                    <p className="text-gray-400 leading-relaxed">
                        Enter your reset token and create a new secure password for your DevConnect account.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-800">
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        {/* Reset Token Field */}
                        <div>
                            <label htmlFor="resetToken" className="block text-sm font-medium text-gray-300 mb-2">
                                Reset Token
                            </label>
                            <div className="relative">
                                <input
                                    id="resetToken"
                                    name="resetToken"
                                    type={showResetToken ? "text" : "password"}
                                    value={resetToken}
                                    onChange={(e) => setResetToken(e.target.value)}
                                    required
                                    placeholder="Paste your reset token here"
                                    className="w-full rounded-lg bg-gray-800/50 border border-gray-700 text-white px-4 py-3 pr-12 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors placeholder-gray-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowResetToken(!showResetToken)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                                >
                                    {showResetToken ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password Field */}
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder="Enter your new password"
                                    className="w-full rounded-lg bg-gray-800/50 border border-gray-700 text-white px-4 py-3 pr-12 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors placeholder-gray-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                                >
                                    {showNewPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Confirm your new password"
                                    className="w-full rounded-lg bg-gray-800/50 border border-gray-700 text-white px-4 py-3 pr-12 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors placeholder-gray-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                                >
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                                <p className="text-red-400 text-sm text-center leading-relaxed">{error}</p>
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
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Resetting Password...
                                </>
                            ) : (
                                'Reset Password'
                            )}
                        </button>

                        {/* Security Info */}
                        <div className="text-center pt-4">
                            <p className="text-gray-500 text-xs leading-relaxed">
                                Make sure your new password is strong and unique to keep your DevConnect account secure.
                            </p>
                        </div>
                    </form>
                </div>

                {/* Additional Help */}
                <div className="text-center mt-6">
                    <p className="text-gray-500 text-xs">
                        Having trouble? Check your email for the reset token or contact support.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword