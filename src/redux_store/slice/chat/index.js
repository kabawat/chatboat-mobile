
import AuthService from "@service/auth.service";
import endpoint from "config/api_endpoint";
const { createSlice } = require("@reduxjs/toolkit");
const { createAsyncThunk } = require("@reduxjs/toolkit");

export const get_contact_list = createAsyncThunk('contact_list', async (_, { rejectWithValue }) => {
    const Service = await AuthService()
    try {
        const { data } = await Service.get(endpoint.CHAT)
        return data
    } catch (error) {
        return rejectWithValue(error.response)
    }
})

const chat_contact = createSlice({
    name: "chat_contact",
    initialState: {
        loading: false,
        error: null,
        data: [],
        status: false,
    },
    extraReducers: (building) => {
        building.addCase(get_contact_list.pending, (state, action) => {
            state.loading = true;
        })
        building.addCase(get_contact_list.fulfilled, (state, { payload }) => {
            const { data } = payload
            state.data = data;
            state.status = true
            state.loading = false
        })
        building.addCase(get_contact_list.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.data = null;
        })
    },
    reducers: {
        udpate_contact_list(state, { payload }) {
            const updatedData = []
            state.data.map((it) => {
                if (it?.chat_id == payload.chat_id) {
                    updatedData.unshift({ ...it, last_chat: payload })
                } else {
                    updatedData.push(it)
                }
            })
            state.data = updatedData
        },

        // add new contact 
        add_new_contact(state, { payload }) {
            state.data.unshift(payload)
        },

        // clear chat 
        clear_chat_message(state, { payload }) {
            state.data = state.data.map(item => {
                if (item?.chat_id == payload.chat_id) {
                    return {
                        ...item,
                        last_chat: {}
                    }
                }
                return item
            })
        },

        // update last message 
        update_last_message(state, { payload }) {
            state.data = state.data.map(item => {
                if (item?.chat_id == payload.current_user.chat_id) {
                    return {
                        ...item,
                        last_chat: payload?.chat
                    }
                }
                return item
            })
        },

        // block contact 
        block_user_contact(state, { payload }) {
            if (payload.is_block) {
                state.data = state.data.map((contact) => {
                    if (`${contact.chat_id}` == `${payload.chat_id}`) {
                        contact.blocked_by.push(payload.blocked_by)
                        contact.is_block = payload.is_block
                    }
                    return contact
                })
            } else {
                state.data = state.data.map((contact) => {
                    if (`${contact.chat_id}` == `${payload.chat_id}`) {
                        let userList = contact.blocked_by.filter(item => `${item}` != `${payload.blocked_by}`);
                        contact.blocked_by = userList
                        contact.is_block = userList?.length ? true : false
                    }
                    return contact
                })
            }
        }
    }
})

const chatContactSlice = chat_contact.reducer
export const { udpate_contact_list, add_new_contact, clear_chat_message, update_last_message, block_user_contact } = chat_contact.actions
export default chatContactSlice