import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "./hooks/useSocket";
import { addNotification } from "./utils/chatSlice";
import { addMessage, fetchUnreadMessages } from "./utils/messageSlice";
import { fetchOnlineUsers, addOnlineUser, removeOnlineUser } from "./utils/onlineStatusSlice";

const Body = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const { isChatOpen, receiver } = useSelector((store) => store.chat) || {};
  const currentUser = useSelector((store) => store.user);

  // Fetch unread messages and online users when component mounts and user is available
  useEffect(() => {
    if (currentUser?._id) {
      dispatch(fetchUnreadMessages());
      dispatch(fetchOnlineUsers());
    }
  }, [currentUser, dispatch]);

  // This single, global listener handles all incoming messages
  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (newMessage) => {
        // Add the message to the central store for history
        dispatch(addMessage(newMessage));

        // Create notification for incoming messages (not from current user)
        // Only show notification if chat window is not open OR if it's open for a different user
        if (newMessage.senderId !== currentUser?._id) {
          if (!isChatOpen || receiver?._id !== newMessage.senderId) {
            dispatch(addNotification(newMessage.senderId));
          }
        }
      };

      socket.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
      };
    }
  }, [socket, isChatOpen, receiver, dispatch, currentUser]);

  // Listen for user online/offline events
  useEffect(() => {
    if (socket) {
      const handleUserOnline = (userId) => {
        dispatch(addOnlineUser(userId));
      };

      const handleUserOffline = (userId) => {
        dispatch(removeOnlineUser(userId));
      };

      socket.on("userOnline", handleUserOnline);
      socket.on("userOffline", handleUserOffline);

      return () => {
        socket.off("userOnline", handleUserOnline);
        socket.off("userOffline", handleUserOffline);
      };
    }
  }, [socket, dispatch]);

  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-950 to-gray-900">
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
