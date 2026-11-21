import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserCard from "../components/Cards/UserCard";
import { RefreshCw } from "lucide-react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    setError("");
    dispatch(removeUserFromFeed(_id));

    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      setError("Oops! Something went wrong.");
      console.error(err);
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
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Unable to fetch the feed"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[85vh] bg-black flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#E1E0CC]/80 border-t-transparent animate-spin mx-auto"></div>
          <p className="text-xs font-mono text-[#E1E0CC]/60">Scanning for matching builders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[85vh] bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto p-10 rounded-3xl bg-[#111113] border border-white/10 space-y-4">
          <h2 className="text-[#E1E0CC] text-xl font-medium tracking-tight">Could not load feed</h2>
          <p className="text-[#E1E0CC]/70 text-sm leading-relaxed">{typeof error === "string" ? error : "An error occurred."}</p>
          <button 
            onClick={getFeed}
            className="inline-flex items-center gap-2 font-medium py-2.5 px-6 rounded-full text-sm transition-all hover:opacity-95 cursor-pointer text-black"
            style={{ backgroundColor: "#E1E0CC" }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  const users = feed?.data?.data || [];

  if (users.length === 0) {
    return (
      <div className="min-h-[85vh] bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto p-12 rounded-3xl bg-[#111113] border border-white/10 space-y-5">
          <div className="space-y-2">
            <h2 className="text-[#E1E0CC] text-2xl font-medium tracking-tight">You're caught up.</h2>
            <p className="text-[#E1E0CC]/60 text-sm leading-relaxed">
              No new developers to discover right now. Broaden your tech stack proficiencies or check back later.
            </p>
          </div>
          <button 
            onClick={getFeed}
            className="inline-flex items-center gap-2 font-medium py-3 px-8 rounded-full text-sm transition-all hover:opacity-95 cursor-pointer text-black"
            style={{ backgroundColor: "#E1E0CC" }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Feed</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-black py-12 px-4 flex flex-col justify-center items-center">
      <div className="max-w-md w-full mx-auto">
        <UserCard
          key={users[0]._id}
          user={users[0]}
          handleSendRequest={handleSendRequest}
        />
        {error && (
          <div className="mt-4 p-3 bg-red-950/40 border border-red-800/80 rounded-xl">
            <p className="text-red-300 text-xs text-center font-mono">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
