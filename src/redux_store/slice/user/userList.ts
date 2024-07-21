import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "@service/auth.service";
import endpoint from "config/api_endpoint";

interface GetUserListArgs {
    query: string;
}

export const getUserList = createAsyncThunk<any, GetUserListArgs, { rejectValue: any }>(
    "get_userList",
    async ({ query }: GetUserListArgs, { rejectWithValue }) => {
        try {
            const service = await AuthService();
            const { data } = await service.get(`${endpoint.USER_LIST}?search=${query ? query : ""}`);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response);
        }
    }
);

interface UserListState {
    loading: boolean;
    error: null | string;
    data: null | any[];
    status: boolean;
}

const userList = createSlice({
    name: "userList",
    initialState: {
        loading: false,
        error: null,
        data: null,
        status: false,
    } as UserListState,
    extraReducers: (builder) => {
        builder.addCase(getUserList.pending, (state: any) => {
            state.loading = true;
        });
        builder.addCase(getUserList.fulfilled, (state: any, { payload }) => {
            state.data = payload.data;
            state.status = true;
            state.loading = false;
        });
        builder.addCase(getUserList.rejected, (state: any, action) => {
            state.error = action.error.message;
            state.loading = false;
            state.data = null;
        });
    },
    reducers: {
        update: (state: UserListState, action) => {
            return action.payload;
        },
    },
});

const userListSlice = userList.reducer;
export default userListSlice;

export const { update } = userList.actions;