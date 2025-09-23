import { createSlice } from "@reduxjs/toolkit"

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => { return { data: action.payload }; },
        removeUserFromFeed: (state, action) => {
            const updatedUsers = state.data.data.filter(user => user._id !== action.payload);
            return {
                ...state,
                data: {
                    ...state.data,
                    data: updatedUsers
                }
            };
        },
        clearFeed: ()=> null
    },
})

export const { addFeed, removeUserFromFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;