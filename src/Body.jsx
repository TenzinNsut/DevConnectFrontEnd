import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "./hooks/useSocket";
import { addNotification } from "./utils/chatSlice";
import { addMessage } from "./utils/messageSlice";

const Body = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const { isChatOpen, receiver } = useSelector((store) => store.chat) || {};
  const currentUser = useSelector((store) => store.user);

  // This single, global listener handles all incoming messages
  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (newMessage) => {
        // Add the message to the central store for history
        dispatch(addMessage(newMessage));

        // If chat window is not open for this sender, create a notification
        if (!isChatOpen || receiver?._id !== newMessage.senderId) {
          if (newMessage.senderId !== currentUser?._id) {
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
