import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        isChatOpen: false,
        receiver: null, // The user object of the person we are chatting with
        notifications: {}, // e.g., { senderId: true }
    },
    reducers: {
        openChat: (state, action) => {
            state.isChatOpen = true;
            state.receiver = action.payload;
            // Clear notification for this chat when it's opened
            if (state.notifications[action.payload._id]) {
                delete state.notifications[action.payload._id];
            }
        },
        closeChat: (state) => {
            state.isChatOpen = false;
            // We don't clear the receiver so that the chat state persists when hidden
        },
        addNotification: (state, action) => {
            // action.payload is the senderId
            state.notifications[action.payload] = true;
        },
    },
});

export const { openChat, closeChat, addNotification } = chatSlice.actions;
export default chatSlice.reducer;
