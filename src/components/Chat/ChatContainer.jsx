import { useSelector } from 'react-redux';
import ChatWindow from './ChatWindow';
import useSocket from '../../hooks/useSocket';

const ChatContainer = () => {
    const { isChatOpen, receiver } = useSelector(store => store.chat);
    const socket = useSocket();

    // Don't render anything if no chat has ever been opened
    if (!receiver) {
        return null;
    }

    // Use a wrapper to control visibility, so the ChatWindow and its state persist
    return (
        <div className={isChatOpen ? 'block' : 'hidden'}>
            <ChatWindow receiver={receiver} socket={socket} />
        </div>
    );
};

export default ChatContainer;
