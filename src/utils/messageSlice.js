import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from './constants';

// Helper to create a consistent conversation ID
const getConversationId = (userId1, userId2) => {
    return [userId1, userId2].sort().join('_');
};

// Async thunk to fetch message history for a conversation
export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async ({ loggedInUserId, otherUserId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/messages/${otherUserId}`, { withCredentials: true });
            const conversationId = getConversationId(loggedInUserId, otherUserId);
            return { conversationId, messages: response.data };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        conversations: {}, // { conversationId: [messages] }
        status: {}, // { conversationId: 'idle' | 'loading' | 'succeeded' | 'failed' }
    },
    reducers: {
        addMessage: (state, action) => {
            console.log("addMessage reducer called with:", action.payload);
            const { senderId, receiverId } = action.payload;
            const conversationId = getConversationId(senderId, receiverId);

            if (!state.conversations[conversationId]) {
                state.conversations[conversationId] = [];
            }

            // Avoid adding duplicates from socket events vs. optimistic updates
            const messageExists = state.conversations[conversationId].find(
                (msg) => msg._id === action.payload._id
            );

            if (!messageExists) {
                console.log(`Adding message to conversation ${conversationId}`);
                state.conversations[conversationId].push(action.payload);
            } else {
                console.log(`Message ${action.payload._id} already exists in conversation.`);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state, action) => {
                const { loggedInUserId, otherUserId } = action.meta.arg;
                const conversationId = getConversationId(loggedInUserId, otherUserId);
                state.status[conversationId] = 'loading';
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                const { conversationId, messages } = action.payload;
                state.conversations[conversationId] = messages;
                state.status[conversationId] = 'succeeded';
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                const { loggedInUserId, otherUserId } = action.meta.arg;
                const conversationId = getConversationId(loggedInUserId, otherUserId);
                state.status[conversationId] = 'failed';
            });
    },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
