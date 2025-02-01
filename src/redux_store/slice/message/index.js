import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "@service/auth.service";
import endpoint from "config/api_endpoint";
export const get_chat_message = createAsyncThunk("get_chat_message", async ({ chat_id, page, limit = 20, clean = false }, { rejectWithValue }) => {
    const Service = await AuthService()
    try {
        const { data } = await Service.post(endpoint.MESSAGE, { chat_id: chat_id, page, limit })
        const mapping = { data, clean }
        return mapping
    } catch (error) {
        if (error?.response?.data?.error) {
            return rejectWithValue(error?.response?.data?.error)
        } else {
            return rejectWithValue('something went wrong')
        }
    }
})
export const get_chat_unread_message = createAsyncThunk("get_chat_unread_message", async ({ chat_id }, { rejectWithValue }) => {
    const Service = await AuthService()
    try {
        const { data } = await Service.put(endpoint.MESSAGE, { chat_id: chat_id, only_read: false })
        const mapping = { data }
        return mapping
    } catch (error) {
        if (error?.response?.data?.error) {
            return rejectWithValue(error?.response?.data?.error)
        } else {
            return rejectWithValue('something went wrong')
        }
    }
})

const chat = createSlice({
    name: "chat",
    initialState: {
        loading: false,
        status: false,
        error: null,
        data: [],
    },
    extraReducers: (builder) => {
        // get seen message 
        builder.addCase(get_chat_message.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(get_chat_message.fulfilled, (state, { payload }) => {
            const { clean, data } = payload
            if (clean) {
                state.data = data?.data
            } else {
                state.data = [...data?.data, ...state.data]
            }
            state.page = data?.page
            state.totalMessages = data?.totalMessages
            state.totalPages = data?.totalPages
            state.status = true
            state.loading = false
        });
        builder.addCase(get_chat_message.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.data = null;
        });

        // get unread message 
        builder.addCase(get_chat_unread_message.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(get_chat_unread_message.fulfilled, (state, { payload }) => {
            const { data } = payload
            if (data?.data?.length) {
                state.data = [...state.data, { isUnRead: true, total: data.data.length }, ...data?.data]
            }
            state.status = true
            state.loading = false
        });
        builder.addCase(get_chat_unread_message.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.data = null;
        });
    },
    reducers: {
        add_new_message(state, action) {
            const data = {
                time: new Date(),
                ...action.payload
            }
            let new_data = []
            if (state.data?.length) {
                new_data = [...state.data, data]
            } else {
                new_data = [data]
            }
            state.data = new_data.filter((item) => !item?.isUnRead)
            return state
        },

        delete_message(state, { payload }) {
            state.data = state.data.filter((_, index) => !payload.includes(index));
        },
    }
})

const chatSlice = chat.reducer
export default chatSlice

export const { add_new_message, delete_message } = chat.actions