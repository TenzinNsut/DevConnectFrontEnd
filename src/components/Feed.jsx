import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserCard from "../components/Cards/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

const handleSendRequest = async (status, _id) => {
  setError("");

  // Remove the user immediately so the next card shows
  dispatch(removeUserFromFeed(_id));

  try {
    await axios.post(
      BASE_URL + "/request/send/" + status + "/" + _id,
      {},
      { withCredentials: true }
    );
    console.log("request:" + status + "/" + _id);
  } catch (error) {
    setError("Oops! Something went wrong.");
    console.error(error);
  }
};


  const getFeed = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      setError(
        error.response?.data ||
          error.message ||
          "Unable to fetch the feed"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
       <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your feed...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
     <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={getFeed}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const users = feed?.data?.data || [];

  if (users.length === 0) {
    return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h2 className="text-white text-2xl font-bold mb-4">No New Users</h2>
          <p className="text-gray-300 mb-6">
            There are no new users in your feed right now. Check back later for more connections!
          </p>
          <button 
            onClick={getFeed}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
          >
            Refresh Feed
          </button>
        </div>
      </div>
    );
  }

  // 👇 Always show the first user from Redux
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8 px-4">
      <div className="max-w-md mx-auto pt-16">
        <UserCard
          key={users[0]._id}
          user={users[0]}
          handleSendRequest={handleSendRequest}
        />
        {error && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-600 rounded-lg">
            <p className="text-red-300 text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;