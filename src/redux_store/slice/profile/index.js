import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endpoint from "config/api_endpoint";
import AuthService from "@service/auth.service";
export const get_profile = createAsyncThunk("get_profile", async (_, { rejectWithValue }) => {
    const Service = await AuthService()
    try {
        const { data } = await Service.get(endpoint.PROFILE)
        return data
    } catch (error) {
        if (error?.response?.data?.error) {
            return rejectWithValue(error?.response?.data?.error)
        } else {
            return rejectWithValue("something went wrong")
        }
    }
})

const profile = createSlice({
    name: "profile",
    initialState: {
        loading: false,
        error: null,
        data: null,
        status: false,
    },
    extraReducers: (builder) => {
        builder.addCase(get_profile.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(get_profile.fulfilled, (state, { payload }) => {
            const { data } = payload
            state.data = data;
            state.status = true
            state.loading = false
        });
        builder.addCase(get_profile.rejected, (state, action) => {
            state.error = action?.payload;
            state.unAuth = true
            state.loading = false;
            state.data = null;
        });
    },
    reducers: {
        update(state, action) {
            return action.payload
        }
    }
})

const profileSlice = profile.reducer
export default profileSlice

export const { update } = profile.actions