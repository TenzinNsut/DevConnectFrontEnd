import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import validator from "validator";
import { Eye, EyeOff, KeyRound, Lock, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

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

  const isValidPassword = (pwd) => {
    return validator.isStrongPassword(pwd, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isValidPassword(newPassword)) {
      setError("Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.");
      return;
    }

    setIsLoading(true);

    try {
      await axios.patch(
        BASE_URL + "/reset-password",
        { resetToken, newPassword },
        { withCredentials: true }
      );

      setSuccessMessage('Password reset successful! Redirecting to login page...');
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong! Please verify your reset token.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-[#E1E0CC] px-4 sm:px-6 py-12 selection:bg-[#E1E0CC] selection:text-black">
      <div className="w-full max-w-md">
        {/* Header with DevConnect Asterisk Brand */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-medium tracking-tight text-2xl text-[#E1E0CC] mb-6 hover:opacity-90 transition-opacity"
          >
            <span>DevConnect</span>
            <span className="text-base -mt-2 font-mono select-none">*</span>
          </Link>
          <h1 className="text-3xl font-medium tracking-tight text-[#E1E0CC] mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-[#E1E0CC]/60 font-normal leading-relaxed max-w-sm mx-auto">
            Paste your token and choose a new secure password.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#111113] rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/10 space-y-5">
          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* Reset Token Field */}
            <div>
              <label
                htmlFor="resetToken"
                className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2"
              >
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
                  className="w-full rounded-2xl bg-black border border-white/10 text-[#E1E0CC] px-4 py-3.5 pr-12 focus:border-[#E1E0CC]/50 outline-none transition-colors placeholder-[#E1E0CC]/30 text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowResetToken(!showResetToken)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#E1E0CC]/50 hover:text-[#E1E0CC] transition-colors"
                >
                  {showResetToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password Field */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2"
              >
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
                  placeholder="Min 8 chars (upper, lower, num, symbol)"
                  className="w-full rounded-2xl bg-black border border-white/10 text-[#E1E0CC] px-4 py-3.5 pr-12 focus:border-[#E1E0CC]/50 outline-none transition-colors placeholder-[#E1E0CC]/30 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#E1E0CC]/50 hover:text-[#E1E0CC] transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter your new password"
                  className="w-full rounded-2xl bg-black border border-white/10 text-[#E1E0CC] px-4 py-3.5 pr-12 focus:border-[#E1E0CC]/50 outline-none transition-colors placeholder-[#E1E0CC]/30 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#E1E0CC]/50 hover:text-[#E1E0CC] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs text-red-300 font-mono">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-300 font-mono leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-full font-medium text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:opacity-95 mt-2"
              style={{ backgroundColor: "#E1E0CC", color: "#000000" }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Reset Password</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Back to Login */}
            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E1E0CC]/60 hover:text-[#E1E0CC] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;