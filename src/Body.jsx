import Navbar from "./components/Navbar"
import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./components/Footer"
import axios from "axios"
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";
// import Home from "./components/Home"; // Remove this import as Home is now handled in App.jsx

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Once you have logged in; you should be making API call again (fetchUser) -> check store
  const userData = useSelector((store) => store.user);

  // Only logout once token is cleared from cookies else stay logged in even after page refresh
  const fetchUser = async () => {
    // If user data is already present in the redux store just return
    if (userData) return;

    try {
      // Get profile of the logged In user
      const res = await axios.get(
        BASE_URL + "/profile/view",
        { withCredentials: true }
      );
      dispatch(addUser(res.data));   
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error(error)
    }
  };

  // HandleUser function will be called as soon as Body component loads
  useEffect(() => {
      // Once you have logged in; you should be making API call again (fetchUser) -> check store
    // if (!userData) {
        fetchUser();
    // }
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-950 to-gray-900">
      <Navbar />
      <main className="flex-grow pt-20">

        {/* Removed <h1>Home Page</h1> */}
        <Outlet /> {/* Allows its children to be rendered */}
      </main>
      <Footer />
    </div>
  );
};

export default Body;