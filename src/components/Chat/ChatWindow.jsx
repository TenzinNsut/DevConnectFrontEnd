import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeChat } from '../../utils/chatSlice';
import { fetchMessages, markMessagesAsRead, addMessage } from '../../utils/messageSlice';
import { Send, X, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const formatTime = (timestamp) => {
  if (!timestamp) return 'just now';
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? 'just now' : format(date, 'p');
};

const ChatWindow = ({ receiver, socket }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(store => store.user);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const conversationId = [currentUser?._id, receiver?._id].sort().join('_');
  const messages = useSelector(state => state.messages.conversations[conversationId]) || [];
  const chatStatus = useSelector(state => state.messages.status[conversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (receiver?._id && currentUser?._id) {
      dispatch(fetchMessages({ loggedInUserId: currentUser._id, otherUserId: receiver._id }));
      dispatch(markMessagesAsRead(receiver._id));
    }
  }, [receiver?._id, currentUser?._id, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      const messageData = {
        _id: Date.now().toString(),
        senderId: currentUser._id,
        receiverId: receiver._id,
        message: message.trim(),
        isOptimistic: true,
        createdAt: new Date().toISOString(),
      };

      dispatch(addMessage(messageData));

      socket.emit('sendMessage', {
        senderId: currentUser._id,
        receiverId: receiver._id,
        message: message.trim(),
      });
      setMessage('');
    }
  };

  if (!receiver) return null;

  return (
    <div className="fixed bottom-0 right-0 md:right-6 w-full h-[540px] md:w-[400px] md:h-[520px] bg-[#0E0E10] border-t md:border border-white/15 md:rounded-t-3xl shadow-2xl flex flex-col z-50 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-black border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={receiver.photoUrl || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
              alt={receiver.firstName}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-white/20"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#E1E0CC] ring-2 ring-black"></span>
          </div>
          <div>
            <h3 className="font-medium text-sm text-[#E1E0CC] tracking-tight">{receiver.firstName} {receiver.lastName}</h3>
            <p className="text-[10px] font-mono text-[#E1E0CC]/50">Direct Room</p>
          </div>
        </div>
        <button
          onClick={() => dispatch(closeChat())}
          className="text-[#E1E0CC]/60 hover:text-[#E1E0CC] p-1.5 rounded-full hover:bg-white/5 transition-colors"
          title="Close chat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0A0A0C]">
        {chatStatus === 'loading' && (
          <div className="flex items-center justify-center py-6 text-xs text-[#E1E0CC]/50 font-mono gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-[#E1E0CC] border-t-transparent animate-spin"></span>
            <span>Fetching messages...</span>
          </div>
        )}

        {messages.length === 0 && chatStatus !== 'loading' && (
          <div className="text-center py-16 text-[#E1E0CC]/40 text-xs space-y-1.5 font-mono">
            <p>Start a conversation with {receiver.firstName}.</p>
            <p className="text-[11px] text-[#E1E0CC]/30">Discuss architectures, code, or ideas.</p>
          </div>
        )}

        {messages.map((msg, index) => {
          const isMe = msg.senderId === currentUser._id;
          return (
            <div
              key={msg._id || index}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md ${
                  isMe
                    ? 'bg-[#E1E0CC] text-black font-normal rounded-br-xs'
                    : 'bg-[#18181B] text-[#E1E0CC] rounded-bl-xs border border-white/10'
                }`}
              >
                <p className="break-words">{msg.message}</p>
              </div>
              <span className="text-[10px] font-mono text-[#E1E0CC]/40 mt-1 px-1">
                {formatTime(msg.createdAt)}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-black border-t border-white/10 flex items-center gap-2 flex-shrink-0"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message ${receiver.firstName}...`}
          className="flex-1 bg-[#161619] border border-white/10 rounded-full px-4 py-2 text-sm text-[#E1E0CC] placeholder-[#E1E0CC]/40 outline-none focus:border-[#E1E0CC]/40 transition-colors"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="rounded-full p-2.5 transition-all disabled:opacity-40 hover:opacity-95 flex-shrink-0 cursor-pointer"
          style={{ backgroundColor: "#E1E0CC", color: "#000000" }}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};

export default ChatWindow;
