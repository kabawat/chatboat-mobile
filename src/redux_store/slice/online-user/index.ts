import { createSlice } from '@reduxjs/toolkit';

interface OnlineState {
    data: any[];
}

const online = createSlice({
    name: 'online',
    initialState: [] as OnlineState['data'],
    reducers: {
        setOnlineUsers(state, action: { payload: { data: any[] } }) {
            return action.payload.data;
        },
    },
});

const onlineUsersSlice = online.reducer;
export const { setOnlineUsers } = online.actions;
export default onlineUsersSlice;