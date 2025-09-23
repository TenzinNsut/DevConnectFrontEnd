import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { removeUser, logout } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { clearConnections } from "../utils/connectionSlice";

const DeleteUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user); // ✅ get current user
  const [showModal, setShowModal] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(
        BASE_URL + "/delete",
        { // Data for DELETE request goes in the 'data' property of the config object
          data: { emailId: user.emailId },
          withCredentials: true
        }
      );
      dispatch(clearFeed());
      dispatch(clearConnections());
      dispatch(removeUser());
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black p-6 flex justify-center">
      {/* Delete Button */}
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-red-700"
      >
        Delete Account
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-black rounded-2xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-pink-700 mb-4">
              Confirm Account Deletion
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Please type your email <b>{user.emailId}</b> to confirm deletion.
            </p>

            <input
              type="email"
              value={inputEmail}
              onChange={(e) => {
                setInputEmail(e.target.value);
                setError("");
              }}
              className="w-full border rounded-lg px-3 py-2 mb-3"
              placeholder="Enter your email"
            />

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={inputEmail !== user.emailId} // ✅ disable until match
                className={`px-4 py-2 rounded-lg text-white ${
                  inputEmail === user.emailId
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
