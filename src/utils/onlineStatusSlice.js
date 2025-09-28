import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from './constants';

// Async thunk to fetch online users
export const fetchOnlineUsers = createAsyncThunk(
    'onlineStatus/fetchOnlineUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/online-users`, { withCredentials: true });
            return response.data.data; // Array of online user IDs
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const onlineStatusSlice = createSlice({
    name: 'onlineStatus',
    initialState: {
        onlineUsers: [], // Array of online user IDs
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    },
    reducers: {
        addOnlineUser: (state, action) => {
            const userId = action.payload;
            if (!state.onlineUsers.includes(userId)) {
                state.onlineUsers.push(userId);
            }
        },
        removeOnlineUser: (state, action) => {
            const userId = action.payload;
            state.onlineUsers = state.onlineUsers.filter(id => id !== userId);
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOnlineUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOnlineUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.onlineUsers = action.payload;
            })
            .addCase(fetchOnlineUsers.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { addOnlineUser, removeOnlineUser, setOnlineUsers } = onlineStatusSlice.actions;
export default onlineStatusSlice.reducer;
