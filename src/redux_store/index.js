import { combineReducers, configureStore } from '@reduxjs/toolkit'
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
});
export default store

