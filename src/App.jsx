import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react"; // Import useCallback
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";

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
import ChatContainer from "./components/Chat/ChatContainer";

function App() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Memoize fetchUser with useCallback to fix the dependency warning
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/profile/view`,
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
    } catch (error) {
      console.error("Failed to fetch user on app load:", error);
      dispatch(addUser(null));
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // Correctly add fetchUser to the dependency array

  if (loading) {
    // ... loading spinner ...
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
      {user && <ChatContainer />}
    </BrowserRouter>
  );
}

export default App;
