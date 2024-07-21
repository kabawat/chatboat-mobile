import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "@service/auth.service";
import endpoint from "config/api_endpoint";
export const getStartMessage = createAsyncThunk("getStartMessage", async (_, { rejectWithValue }) => {
    try {
        const Service = await AuthService()
        const { data } = await Service.get(endpoint.STATIC)
        return data
    } catch (error: any) {
        return rejectWithValue(error.response)
    }
})
interface StartMessage {
    loading: boolean;
    error: null | string;
    data: null | any;
    status: boolean;
}
const chat = createSlice({
    name: "startMessage",
    initialState: {
        loading: false,
        error: null,
        status: false,
        data: [],
    } as StartMessage,
    extraReducers: (builder) => {
        builder.addCase(getStartMessage.pending, (state: any) => {
            state.loading = true;
        });
        builder.addCase(getStartMessage.fulfilled, (state: any, { payload }) => {
            const { message } = payload;
            state.data = message;
            state.status = true;
            state.loading = false;
        });
        builder.addCase(getStartMessage.rejected, (state: any, action) => {
            state.error = action.payload;
            state.loading = false;
            state.data = null;
        });
    },
    reducers: {

    }
})

const startMessageSclice = chat.reducer
export default startMessageSclice