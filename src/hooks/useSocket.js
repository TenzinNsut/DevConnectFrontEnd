import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const useSocket = () => {
    const user = useSelector(store => store.user);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user?._id) {
            // Use environment variable with a fallback to your production URL
            const socketUrl = import.meta.env.VITE_SOCKET_URL || 'https://devconnectbackend-algg.onrender.com';
            
            const newSocket = io(socketUrl, {
                query: { userId: user._id },
            });

            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Socket connected successfully:', newSocket.id);
            });

            newSocket.on('connect_error', (err) => {
                console.error('Socket connection error:', err.message);
            });

            // Cleanup on component unmount
            return () => {
                newSocket.disconnect();
            };
        }
    }, [user]);

    return socket;
};

export default useSocket;
