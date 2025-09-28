import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice"
import requestsReducer from "./requestsSlice"
import chatReducer from "./chatSlice"
import messageReducer from "./messageSlice"
import onlineStatusReducer from "./onlineStatusSlice"

export const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestsReducer,
        chat: chatReducer,
        messages: messageReducer,
        onlineStatus: onlineStatusReducer
    }
})

export default appStore;



