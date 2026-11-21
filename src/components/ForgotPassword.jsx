import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { ArrowRight, CheckCircle2, AlertCircle, Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [emailId, setEmailId] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailRequest = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      if (!emailId.trim()) {
        setError("Email address is required.");
        return;
      }
      await axios.post(
        BASE_URL + "/forgot-password",
        { emailId },
        {}
      );

      setSuccessMessage("Password reset link sent to your email! Redirecting to reset page...");
      setTimeout(() => {
        navigate("/reset-password");
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong! Please try again.");
      console.error("Forgot password error:", err);
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
            Forgot Password?
          </h1>
          <p className="text-sm text-[#E1E0CC]/60 font-normal leading-relaxed max-w-sm mx-auto">
            Enter your email and we'll send you instructions to reset your password.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#111113] rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/10 space-y-6">
          <form onSubmit={handleEmailRequest} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={emailId}
                  onChange={(event) => setEmailId(event.target.value)}
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="w-full rounded-2xl bg-black border border-white/10 text-[#E1E0CC] px-4 py-3.5 focus:border-[#E1E0CC]/50 outline-none transition-colors placeholder-[#E1E0CC]/30 text-sm"
                />
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
              className="w-full h-12 rounded-full font-medium text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:opacity-95"
              style={{ backgroundColor: "#E1E0CC", color: "#000000" }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>Sending reset link...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
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

        {/* Footer info */}
        <div className="text-center mt-6">
          <p className="text-[#E1E0CC]/40 text-xs font-mono">
            DevConnect · Peer-to-peer developer pairing
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;