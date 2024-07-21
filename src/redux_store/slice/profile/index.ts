import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '@service/auth.service';
import endpoint from 'config/api_endpoint';


export const getProfile = createAsyncThunk(
    'get_profile',
    async (_, { rejectWithValue }) => {
        const Service = await AuthService();
        try {
            const { data } = await Service.get(endpoint.PROFILE);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response);
        }
    }
);

interface ProfileState {
    loading: boolean;
    error: null | string;
    data: null | any;
    status: boolean;
}

const profile = createSlice({
    name: 'profile',
    initialState: {
        loading: false,
        error: null,
        data: null,
        status: false,
    } as ProfileState,
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state: any, action: any) => {
            state.loading = true;
        });
        builder.addCase(getProfile.fulfilled, (state: any, { payload }: any) => {
            state.data = payload;
            state.status = true;
            state.loading = false;
        });
        builder.addCase(getProfile.rejected, (state: any, action: any) => {
            state.error = action.payload;
            state.loading = false;
            state.data = null;
        });
    },
    reducers: {
        update: (state, action) => {
            return action.payload;
        },
    },
});

const profileSlice = profile.reducer;
export default profileSlice;

export const { update } = profile.actions;