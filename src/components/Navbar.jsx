import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate, Link } from "react-router-dom";
import { removeUser, logout } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { clearConnections } from "../utils/connectionSlice";
import { clearMessages } from "../utils/messageSlice";
import { resetChat } from "../utils/chatSlice";
import { Compass, Users, Inbox, User, LogOut } from "lucide-react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const { notifications } = useSelector((store) => store.chat) || {};
  const { unreadCount } = useSelector((store) => store.messages) || {};
  const hasNotifications = notifications ? Object.keys(notifications).length > 0 : false;
  const hasUnreadMessages = unreadCount > 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );

      dispatch(clearFeed());
      dispatch(clearConnections());
      dispatch(clearMessages());
      dispatch(resetChat());
      dispatch(removeUser());
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo - Alabaster Studio style with Asterisk */}
        <Link
          to={user ? "/feed" : "/"}
          className="flex items-center gap-1.5 font-medium tracking-[-0.04em] text-xl transition-opacity hover:opacity-90"
          style={{ color: "#E1E0CC" }}
        >
          <span>DevConnect</span>
          <span className="text-sm -mt-2 select-none font-mono" style={{ color: "#E1E0CC" }}>*</span>
        </Link>

        {/* Authenticated Navigation Items */}
        {user ? (
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden md:flex items-center gap-2 font-medium text-sm">
              <Link
                to="/feed"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-colors"
                style={{ color: "rgba(225, 224, 204, 0.75)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.75)")}
              >
                <Compass className="w-4 h-4 opacity-70" />
                <span>Discover</span>
              </Link>

              <Link
                to="/connections"
                className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-colors"
                style={{ color: "rgba(225, 224, 204, 0.75)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.75)")}
              >
                <Users className="w-4 h-4 opacity-70" />
                <span>Connections</span>
                {(hasNotifications || hasUnreadMessages) && (
                  <span className="flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#E1E0CC] text-black font-bold text-[10px]">
                    {hasUnreadMessages ? (unreadCount > 9 ? "9+" : unreadCount) : "!"}
                  </span>
                )}
              </Link>

              <Link
                to="/requests"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-colors"
                style={{ color: "rgba(225, 224, 204, 0.75)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.75)")}
              >
                <Inbox className="w-4 h-4 opacity-70" />
                <span>Requests</span>
              </Link>
            </nav>

            {/* User Profile & Dropdown */}
            <div className="flex items-center gap-3 pl-3 sm:border-l sm:border-white/10">
              <div className="hidden sm:block text-right">
                <p className="text-[11px] font-mono" style={{ color: "rgba(225, 224, 204, 0.5)" }}>Welcome back,</p>
                <p className="text-xs font-medium tracking-wide" style={{ color: "#E1E0CC" }}>{user.firstName}</p>
              </div>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar relative ring-1 ring-[#E1E0CC]/30 hover:ring-[#E1E0CC] transition-all p-0.5"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-black">
                    <img
                      alt={user.firstName}
                      src={user.photoUrl || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {(hasNotifications || hasUnreadMessages) && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 rounded-full bg-[#E1E0CC] border-2 border-black" />
                  )}
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-[#111113] border border-white/10 rounded-2xl z-50 mt-3 w-56 p-2 shadow-2xl"
                  style={{ color: "#E1E0CC" }}
                >
                  <li className="px-3 py-2 border-b border-white/10 mb-1">
                    <div className="flex flex-col p-0 hover:bg-transparent">
                      <span className="font-medium text-sm" style={{ color: "#E1E0CC" }}>{user.firstName} {user.lastName}</span>
                      <span className="text-xs font-mono truncate" style={{ color: "rgba(225, 224, 204, 0.5)" }}>{user.emailId}</span>
                    </div>
                  </li>

                  <li>
                    <Link to="/profile" className="flex items-center gap-2.5 py-2 hover:bg-white/5 rounded-xl">
                      <User className="w-4 h-4 opacity-70" />
                      <span>Edit Profile</span>
                    </Link>
                  </li>

                  <li className="md:hidden">
                    <Link to="/feed" className="flex items-center gap-2.5 py-2 hover:bg-white/5 rounded-xl">
                      <Compass className="w-4 h-4 opacity-70" />
                      <span>Discover</span>
                    </Link>
                  </li>

                  <li className="md:hidden">
                    <Link to="/connections" className="flex items-center justify-between py-2 hover:bg-white/5 rounded-xl">
                      <span className="flex items-center gap-2.5">
                        <Users className="w-4 h-4 opacity-70" />
                        <span>Connections</span>
                      </span>
                      {(hasNotifications || hasUnreadMessages) && (
                        <span className="badge badge-sm bg-[#E1E0CC] text-black font-bold">
                          {hasUnreadMessages ? unreadCount : "!"}
                        </span>
                      )}
                    </Link>
                  </li>

                  <li className="md:hidden">
                    <Link to="/requests" className="flex items-center gap-2.5 py-2 hover:bg-white/5 rounded-xl">
                      <Inbox className="w-4 h-4 opacity-70" />
                      <span>Requests</span>
                    </Link>
                  </li>

                  <div className="my-1 border-t border-white/10"></div>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 py-2 text-rose-400 hover:text-rose-300 hover:bg-white/5 rounded-xl w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Unauthenticated links & buttons */
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden sm:flex items-center gap-6 text-xs md:text-sm font-medium">
              <Link to="/features" className="transition-colors" style={{ color: "rgba(225, 224, 204, 0.75)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.75)")}>
                Features
              </Link>
              <Link to="/how-it-works" className="transition-colors" style={{ color: "rgba(225, 224, 204, 0.75)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.75)")}>
                How it works
              </Link>
              <Link to="/tech-stack" className="transition-colors" style={{ color: "rgba(225, 224, 204, 0.75)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.75)")}>
                Tech stack
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-medium transition-colors px-3 py-1.5"
                style={{ color: "rgba(225, 224, 204, 0.85)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.85)")}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-xs sm:text-sm font-medium rounded-full px-5 py-2 transition-all hover:opacity-95"
                style={{ backgroundColor: "#E1E0CC", color: "#000000" }}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;
