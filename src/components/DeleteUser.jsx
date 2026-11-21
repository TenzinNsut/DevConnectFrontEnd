import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { removeUser, logout } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { clearConnections } from "../utils/connectionSlice";
import { AlertTriangle, X } from "lucide-react";

const DeleteUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [showModal, setShowModal] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(
        BASE_URL + "/delete",
        {
          data: { emailId: user.emailId },
          withCredentials: true
        }
      );
      dispatch(clearFeed());
      dispatch(clearConnections());
      dispatch(removeUser());
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to delete account. Please try again.");
    }
  };

  return (
    <div className="bg-[#111113] border border-red-950/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="space-y-1 text-center sm:text-left">
        <h4 className="text-sm font-medium text-red-400">Danger Zone</h4>
        <p className="text-xs text-[#E1E0CC]/50">
          Permanently delete your profile, connections, and message history.
        </p>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="px-5 py-2.5 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-mono transition-all cursor-pointer whitespace-nowrap"
      >
        Delete Account
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4">
          <div className="bg-[#111113] border border-red-900/40 rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-lg font-medium">Delete Account</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#E1E0CC]/40 hover:text-[#E1E0CC] p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#E1E0CC]/70 leading-relaxed font-normal">
              This action is permanent and cannot be undone. To proceed, please confirm your email address <strong className="text-white font-mono">{user?.emailId}</strong>.
            </p>

            <input
              type="email"
              value={inputEmail}
              onChange={(e) => {
                setInputEmail(e.target.value);
                setError("");
              }}
              className="w-full rounded-2xl bg-black border border-white/10 px-4 py-3 text-sm text-[#E1E0CC] placeholder-[#E1E0CC]/30 outline-none focus:border-red-500/50 font-mono"
              placeholder="Confirm your email"
            />

            {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-full border border-white/15 text-xs text-[#E1E0CC]/70 hover:text-white font-mono transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={inputEmail !== user?.emailId}
                className={`px-5 py-2 rounded-full text-xs font-mono transition-all ${
                  inputEmail === user?.emailId
                    ? "bg-red-600 hover:bg-red-500 text-white shadow-lg cursor-pointer"
                    : "bg-white/5 text-[#E1E0CC]/30 border border-white/5 cursor-not-allowed"
                }`}
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
