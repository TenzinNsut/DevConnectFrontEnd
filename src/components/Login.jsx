import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function: Login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data || "Invalid Credentials!");
      console.error(err);
    }
  };

  // Redirect if already logged in
  const user = useSelector((store) => store.user);
  if (user) return <Navigate to="/feed" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your DevConnect account</p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-800">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={emailId}
                onChange={(event) => setEmailId(event.target.value)}
                required
                autoComplete="off"
                placeholder="Enter your email"
                className="w-full rounded-lg bg-gray-800/50 border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors placeholder-gray-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <Link
                  to="/forgot"
                  className="text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg bg-gray-800/50 border border-gray-700 text-white px-4 py-3 pr-12 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
            >
              Sign in
            </button>




          </form>
        </div>

        {/* Bottom Link */}
        <p className="mt-8 text-center text-gray-400">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold text-green-400 hover:text-green-300 transition-colors"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;