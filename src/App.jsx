import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { useEffect, useState } from "react"; // Import useState
import axios from "axios"; // Import axios
import { BASE_URL } from "./utils/constants"; // Import BASE_URL
import { addUser } from "./utils/userSlice"; // Import addUser

import Body from "./Body";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Feed from "./components/Feed";

function App() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch(); // Initialize useDispatch
  const [loading, setLoading] = useState(true); // Add loading state

  // Function to fetch user data
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/profile/view",
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
    } catch (error) {
      // If there's an error (e.g., 401 Unauthorized), it means no valid session
      console.error("Failed to fetch user on app load:", error);
      dispatch(addUser(null)); // Explicitly set user to null if fetch fails
    } finally {
      setLoading(false); // Set loading to false after attempt
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // Run once on component mount

  if (loading) {
    // Show a loading spinner or splash screen while checking auth status
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading user session...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Unauthenticated Home Page */}
        <Route path="/" element={user ? <Navigate to="/feed" replace /> : <Home />} />

        {/* Authenticated Routes (using Body as a layout) */}
        {user && (
          <Route element={<Body />}> {/* Body acts as a layout for these routes */}
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            {/* Add more authenticated routes here */}
          </Route>
        )}

        {/* Catch-all for unmatched routes (redirect to login if not authenticated, or feed if authenticated) */}
        <Route path="*" element={user ? <Navigate to="/feed" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
