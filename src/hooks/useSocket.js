import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

let globalSocket = null;
let currentSocketUserId = null;

const useSocket = () => {
    const user = useSelector(store => store.user);
    const [socket, setSocket] = useState(globalSocket);

    useEffect(() => {
        if (!user?._id) {
            if (globalSocket) {
                globalSocket.disconnect();
                globalSocket = null;
                currentSocketUserId = null;
                setSocket(null);
            }
            return;
        }

        // If a socket already exists for this exact user and is active, reuse it
        if (globalSocket && currentSocketUserId === user._id) {
            setSocket(globalSocket);
            return;
        }

        // Disconnect old socket if user changed
        if (globalSocket) {
            globalSocket.disconnect();
            globalSocket = null;
        }

        const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
        const newSocket = io(socketUrl, {
            query: { userId: user._id },
            withCredentials: true,
            transports: ['websocket', 'polling'],
        });

        globalSocket = newSocket;
        currentSocketUserId = user._id;
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Socket connected successfully:', newSocket.id);
        });

        newSocket.on('connect_error', (err) => {
            console.error('Socket connection error:', err.message);
        });

    }, [user?._id]);

    return socket;
};

export default useSocket;
