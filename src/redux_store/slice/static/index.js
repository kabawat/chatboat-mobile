import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endpoint from "config/api_endpoint";
import AuthService from "@service/auth.service";
export const getStartMessage = createAsyncThunk("getStartMessage", async (_, { rejectWithValue }) => {
    const Service = await AuthService()
    try {
        const { data } = await Service.get(endpoint.STATIC)
        return data
    } catch (error) {
        if (error?.response?.data?.error) {
            return rejectWithValue(error?.response?.data?.error)
        } else {
            return rejectWithValue('something went wrong')
        }
    }
})

const chat = createSlice({
    name: "StartMessage",
    initialState: {
        loading: false,
        error: null,
        status: false,
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getStartMessage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getStartMessage.fulfilled, (state, { payload }) => {

            const { message } = payload
            state.data = message
            state.status = true
            state.loading = false
        });
        builder.addCase(getStartMessage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.data = null;
        });
    },
})

const startMessageSclice = chat.reducer
export default startMessageSclice