import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '@service/auth.service';
import endpoint from 'config/api_endpoint';


export const getChatMessage = createAsyncThunk(
    'get_chat_message',
    async ({ chatId, page, clean = false }: { chatId: any; page: number; clean?: boolean }, { rejectWithValue }) => {
        const Service = await AuthService();
        try {
            const { data } = await Service.post(endpoint.MESSAGE, { chatId, page });
            const mapping = { data, clean };
            return mapping;
        } catch (error: any) {
            return rejectWithValue(error.response);
        }
    }
);

interface ChatState {
    loading: boolean;
    status: boolean;
    error: null | string;
    data: any[];
    page: number | null;
    totalMessages: number | null;
    totalPages: number | null;
}

interface GetMessagePayload {
    data: any;
    clean: boolean;
}

const chat = createSlice({
    name: 'chat',
    initialState: {
        loading: false,
        status: false,
        error: null,
        data: [],
        page: null,
        totalMessages: null,
        totalPages: null,
    } as ChatState,
    extraReducers: (builder) => {
        builder.addCase(getChatMessage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getChatMessage.fulfilled, (state, { payload }: { payload: GetMessagePayload }) => {
            const { clean, data } = payload;
            if (clean) {
                state.data = data?.data;
            } else {
                state.data = [...data?.data, ...state.data];
            }
            state.page = data?.page;
            state.totalMessages = data?.totalMessages;
            state.totalPages = data?.totalPages;
            state.status = true;
            state.loading = false;
        });
        builder.addCase(getChatMessage.rejected, (state: any, action: any) => {
            state.error = action.payload;
            state.loading = false;
            state.data = null;
        });
    },
    reducers: {
        addNewMessage: (state, action) => {
            const data = {
                time: new Date(),
                ...action.payload,
            };
            const new_data = [...state.data, data];
            state.data = new_data;
            return state;
        },
        deleteMessage: (state, { payload }: { payload: number[] }) => {
            state.data = state.data.filter((item, index) => !payload.includes(index));
        },
    },
});

const chatSlice = chat.reducer;
export default chatSlice;

export const { addNewMessage, deleteMessage } = chat.actions;