# DevConnect: Real-Time Chat Feature Implementation Guide

This document outlines the complete process of integrating a real-time chat feature into the DevConnect application using the MERN stack and Socket.IO.

---

## 1. Backend Implementation (Node.js & Socket.IO)

The backend was upgraded from a standard REST API to a real-time server capable of handling WebSocket connections.

### 1.1. Dependencies

The `socket.io` library was added to the backend to enable real-time, bidirectional communication between the server and clients.

```bash
npm install socket.io
```

### 1.2. Server Integration

The main server file, `app.js`, was modified to support both Express and Socket.IO:

1.  **HTTP Server Creation**: The native `http` module was used to create a server from the Express `app`.
2.  **Socket.IO Initialization**: A new Socket.IO server instance (`io`) was created and attached to the HTTP server, configured with the same CORS policy as the Express app to allow connections from the frontend.
3.  **Listening**: The application now listens for connections on the `server` instance instead of the `app` instance.

*File: `Backend/src/app.js`*
```javascript
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
    cors: { /* ... */ }
});

// ...

server.listen(port, () => { /* ... */ });
```

### 1.3. Message Database Model

To persist chat history, a new Mongoose model was created.

*File: `Backend/src/models/message.js`*
```javascript
const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true }
}, { timestamps: true }); // timestamps: true automatically adds createdAt and updatedAt

const Message = mongoose.model('Message', messageSchema);
```

### 1.4. API for Chat History

A new router and API endpoint were created to fetch the message history for a specific conversation.

*File: `Backend/src/routes/messageRouter.js`*
```javascript
// GET /messages/:otherUserId
messageRouter.get("/messages/:otherUserId", userAuth, async (req, res) => {
    const loggedInUserId = req.userProfile._id;
    const otherUserId = req.params.otherUserId;

    const messages = await Message.find({
        $or: [
            { senderId: loggedInUserId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: loggedInUserId },
        ]
    }).sort({ createdAt: 'asc' });

    res.status(200).json(messages);
});
```
This router was then registered in `app.js`.

### 1.5. Real-Time Event Handling

The core chat logic was added to `app.js`:

-   **User Mapping**: A `userSocketMap` object tracks which `userId` corresponds to which `socket.id`, allowing us to send messages to specific online users.
-   **Connection**: When a user connects, their `userId` (sent from the client) is stored in the map.
-   **`sendMessage` Event**: When a client emits this event, the server:
    1.  Saves the message to the MongoDB database via the `Message` model.
    2.  Looks up the receiver's `socket.id` in the `userSocketMap`.
    3.  If the receiver is online, emits a `receiveMessage` event directly to them.
    4.  Emits the same `receiveMessage` event back to the original sender so their UI can update.
-   **Disconnection**: When a user disconnects, they are removed from the `userSocketMap`.

---

## 2. Frontend Implementation (React & Socket.IO)

The frontend was updated to include a chat UI, connect to the socket server, and manage chat state globally using Redux.

### 2.1. Dependencies

`socket.io-client` was installed for connecting to the backend socket server, and `date-fns` was added for formatting message timestamps.

```bash
npm install socket.io-client date-fns
```

### 2.2. Global State Management (Redux)

Two new Redux slices were created to manage the chat feature globally.

1.  **`chatSlice.js`**: Manages the UI state of the chat window.
    -   `isChatOpen`: A boolean to show or hide the chat window.
    -   `receiver`: Stores the user object of the person being chatted with.
    -   `notifications`: An object to track unread messages from different users.
    -   **Actions**: `openChat`, `closeChat`, `addNotification`.

2.  **`messageSlice.js`**: Manages the actual message data to ensure history persists.
    -   `conversations`: An object that stores message arrays, keyed by a unique `conversationId`.
    -   **`fetchMessages` Thunk**: An async action to call the `/api/messages/:otherUserId` endpoint and load chat history into the store.
    -   **`addMessage` Reducer**: Adds a new incoming message to the correct conversation array in the store.

These reducers were then added to the main `appStore.js`.

### 2.3. Core Frontend Logic

1.  **`useSocket.js` Hook**: A custom hook was created to establish and manage the WebSocket connection. It connects automatically when a user logs in and passes the `userId` as a query parameter for backend identification.

2.  **Global Listener (`Body.jsx`)**: The main listener for the `receiveMessage` socket event was placed in the `Body` component. This ensures the app can always receive messages and notifications, even if no chat window is open. When a message arrives, this listener dispatches actions to `messageSlice` (to save the message) and `chatSlice` (to create a notification).

3.  **Chat UI (`ChatWindow.jsx`)**: This component was built to:
    -   Dispatch the `fetchMessages` thunk to load history from the Redux store when it opens.
    -   Use `useSelector` to display the messages for the active conversation.
    -   Provide an input field and a "Send" button.
    -   Implement an **Optimistic Update**: On sending a message, it immediately dispatches an `addMessage` action to Redux with a temporary message object. This makes the sender's message appear instantly in their own UI, creating a seamless experience.

4.  **Integration**: 
    -   The `<ChatContainer />` was added to `App.jsx` to render the chat window globally.
    -   The "Message" button in `ConnectionsCard.jsx` was updated to dispatch the `openChat` action with the recipient's user data, which triggers the chat window to open and load the correct conversation.

### 2.4. Environment Variables

A new environment variable was required for the frontend:

-   **`VITE_SOCKET_URL`**: The absolute URL of the deployed backend server (e.g., `https://devconnectbackend-algg.onrender.com`). This is used by the `useSocket` hook to establish a direct WebSocket connection.
