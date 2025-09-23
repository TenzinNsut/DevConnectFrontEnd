import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequests: (state, action) => {
            // Remove particaular user, once it connection request is "rejected"
            const newArray = state.filter((r) => r._id !== action.payload);
            // Pass the new/updated Array or User details
            return newArray;
        }
    }
})


export const { addRequests, removeRequests } = requestsSlice.actions;
export default requestsSlice.reducer;