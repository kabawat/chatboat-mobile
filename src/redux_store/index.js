import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import startMessageSclice from './slice/static'
import onlineUsersSlice from './slice/online-user'
import chatContactSlice from './slice/chat'
import userListSlice from './slice/user/userList'
import profileSlice from './slice/profile'
import current_user from './slice/user'
import chatSlice from './slice/message'
const rootReducer = combineReducers({
    online_users: onlineUsersSlice,
    current_user: current_user,
    user_list: userListSlice,
    startMsg: startMessageSclice,
    contact: chatContactSlice,
    profile: profileSlice,
    chat: chatSlice,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredPaths: ['chat.data', 'payload'], // Specify the path to ignore
            ignoredActions: ['chat_contact/update_contact_lastchat', 'chat/add_new_message', 'chat_contact/udpate_contact_lastchat', 'chat/add_new_message', 'chat_contact/udpate_contact_lastchat'], // Ignore specific actions
        },
    })
});

export default store