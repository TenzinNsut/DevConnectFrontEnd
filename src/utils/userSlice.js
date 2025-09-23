import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        // Methods
        addUser: (state, action) => {
            return action.payload;  /* state: will store the data */
        },
        removeUser: () => {
            return null;
        },
        logout: () => {
            return null;
        }
 
    }
})

export const { addUser, removeUser, logout } = userSlice.actions;
export default userSlice.reducer; 

