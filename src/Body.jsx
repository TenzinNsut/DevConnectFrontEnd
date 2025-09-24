import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
// import axios from "axios"
// import { BASE_URL } from "./utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "./utils/userSlice";
// import { useEffect } from "react";
// import Home from "./components/Home"; // Remove this import as Home is now handled in App.jsx

const Body = () => {
  // const dispatch = useDispatch(); // No longer needed here
  // const navigate = useNavigate(); // No longer needed here
  // const userData = useSelector((store) => store.user); // No longer needed here

  // Removed fetchUser logic

  // Removed useEffect for fetchUser

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