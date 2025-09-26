import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeChat } from '../../utils/chatSlice';
import { fetchMessages } from '../../utils/messageSlice';
import { Send } from 'lucide-react';
import { format } from 'date-fns';
import {addMessage} from '../../utils/messageSlice'

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

    // Fetch message history if it hasn't been fetched yet
    useEffect(() => {
        if (receiver?._id && (!chatStatus || chatStatus === 'idle')) {
            dispatch(fetchMessages({ loggedInUserId: currentUser._id, otherUserId: receiver._id }));
        }
    }, [receiver, chatStatus, dispatch, currentUser]);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && socket) {
            const messageData = {
                _id: Date.now().toString(), // Temporary ID for the key
                senderId: currentUser._id,
                receiverId: receiver._id,
                message: message,
                createdAt: new Date().toISOString(), // Temporary timestamp
            };

            // Optimistically update the UI immediately
            dispatch(addMessage(messageData));

            // Send the message to the server
            socket.emit('sendMessage', {
                senderId: currentUser._id,
                receiverId: receiver._id,
                message: message,
            });
            setMessage('');
        }
    };

    if (!receiver) return null;

    return (
        <div className="fixed bottom-0 right-0 md:right-4 w-full h-full md:w-96 md:h-[500px] bg-gray-900 border-t-2 md:border-2 border-gray-700 md:rounded-t-lg shadow-2xl flex flex-col z-50">
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-t-lg flex-shrink-0">
                <div className="flex items-center gap-3">
                    <img src={receiver.photoUrl} alt={receiver.firstName} className="w-8 h-8 rounded-full object-cover" />
                    <h3 className="font-bold text-white">{receiver.firstName} {receiver.lastName}</h3>
                </div>
                <button onClick={() => dispatch(closeChat())} className="text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
                {chatStatus === 'loading' && <p className='text-center text-gray-400'>Loading history...</p>}
                {messages.map((msg, index) => (
                    <div key={msg._id || index} className={`flex flex-col mb-3 ${msg.senderId === currentUser._id ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-xs px-3 py-2 rounded-2xl ${msg.senderId === currentUser._id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                            <p className="text-sm break-words">{msg.message}</p>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 px-1">
                            {format(new Date(msg.createdAt), 'p')}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-2 border-t border-gray-700 flex items-center gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 text-white flex-shrink-0">
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;