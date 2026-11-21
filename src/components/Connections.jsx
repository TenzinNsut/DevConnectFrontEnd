import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addConnections } from "../utils/connectionSlice";
import ConnectionsCard from "../components/Cards/ConnectionsCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        BASE_URL + "/user/connections",
        { withCredentials: true }
      );
      dispatch(addConnections(res.data.data));
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to fetch connections");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="min-h-[85vh] bg-black text-[#E1E0CC] py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E1E0CC]/50">Network</span>
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#E1E0CC]">
              Connections
            </h1>
          </div>

          <Link
            to="/feed"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors hover:text-[#E1E0CC]"
            style={{ color: "rgba(225, 224, 204, 0.7)" }}
          >
            <span>Discover more builders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {error && (
          <div className="p-4 bg-red-950/40 border border-red-800/80 rounded-2xl">
            <p className="text-red-300 text-sm font-mono">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#E1E0CC]/70 border-t-transparent animate-spin mx-auto"></div>
            <p className="text-xs font-mono text-[#E1E0CC]/50">Loading connections...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections && connections.length > 0 ? (
              connections.map((user) => (
                <ConnectionsCard key={user._id} user={user} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4 max-w-md mx-auto">
                <h3 className="text-xl font-medium text-[#E1E0CC]">No connections established yet</h3>
                <p className="text-sm text-[#E1E0CC]/60 leading-relaxed font-normal">
                  Explore developer profiles in the feed to discover engineers matching your craft.
                </p>
                <Link
                  to="/feed"
                  className="inline-flex items-center gap-2 font-medium py-3 px-8 rounded-full text-sm transition-all hover:opacity-95 cursor-pointer text-black"
                  style={{ backgroundColor: "#E1E0CC" }}
                >
                  <span>Explore Feed</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Connections;
