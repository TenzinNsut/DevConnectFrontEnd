import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { BASE_URL } from "../utils/constants";
import { useNavigate, Link } from "react-router-dom";
import { removeUser, logout } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice"
import {clearConnections} from "../utils/connectionSlice"



const Navbar = () => {
  const user = useSelector((store) => {return store.user } ); // get the user from store
  const { notifications } = useSelector((store) => store.chat) || {};
  const { unreadCount } = useSelector((store) => store.messages) || {};
  const hasNotifications = notifications ? Object.keys(notifications).length > 0 : false;
  const hasUnreadMessages = unreadCount > 0;
  const logo = "</> DevConnect";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // event.preventDefault(); // 🚨 Prevents form from reloading and appending to URL
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true} // allows cookies (for development)
      );

      dispatch(clearFeed());
      dispatch(clearConnections());
      dispatch(removeUser())
      dispatch(logout());
      navigate("/login");
      
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
         <div className="navbar w-full fixed z-10 backdrop-blur">
        <div className="flex-1">
          {/* Logo links to feed if logged in, otherwise to home */}
          { (user) ? <Link to="/feed" className="btn btn-ghost text-xl hover:bg">{logo}</Link>:<Link to="/" className="btn btn-ghost text-xl">{logo}</Link>} 
        </div>
        {/* Conditional rendering for logged-in vs. unauthenticated users */}
        {user ? (
          // Logged-in user menu
          <div className="flex gap-2 my-1 ">
            <div className="flex-col mx-5 justify-items-center">
              <p>Welcom back!</p>
              <p className="">{user.firstName}</p>
            </div>
            <div className="dropdown dropdown-end backdrop-blur-3xl ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar relative"
              >
                <div className="cursor-pointer w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
                  />
                </div>
                
                {/* Enhanced Notification Badge */}
                {(hasNotifications || hasUnreadMessages) && (
                  <div className="absolute top-6 -right-1 bg-green-600 border-2 border-gray-900 rounded-full p-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-xs font-bold text-white">
                        {hasUnreadMessages ? (unreadCount > 9 ? '9+' : unreadCount) : '!'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-300 backdrop-blur rounded-box z-1 mt-5 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    {/* <span className="badge">Me!</span> */}
                  </Link>
                </li>
                <li>
                  <Link to="/feed">Discover</Link>
                </li>
                <li>
                  <Link to="/connections" className="relative">
                    <div className="flex items-center justify-between w-full">
                      My Connections
                      {(hasNotifications || hasUnreadMessages) && (
                        <div className="">
                          {hasUnreadMessages ? (unreadCount > 9) ? <span className="badge animate-pulse px-5 bg-green-600 ml-8" > '9+' </span> : <span className="badge animate-pulse px-2 bg-green-600 ml-8" > {unreadCount} </span> : <span className="badge animate-pulse px-2 bg-green-600 ml-8" > !</span>}

                        </div>
                      )}

                      <span className=""></span>
                    </div>
                  </Link>
                </li>
                  <li>
                  <Link to="/requests">Requests Recieved</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Unauthenticated user buttons
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        )}
      </div>
    </div>

  )
}

export default Navbar;