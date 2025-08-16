import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
    id: string;
    name: string;
    email: string;
    address: string;
    profession: string;
}

interface AuthState {
    userInfo: UserInfo;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    userInfo: {
        id: "",
        name: "",
        email: "",
        address: "",
        profession: "",
    },
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            if (!state.userInfo) {
                state.userInfo = { ...initialState.userInfo };
            }
            state.userInfo.email = action.payload;
        },
        // ... other reducers
        setUser: (state, action) => {
            state.userInfo = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        removeUser: (state) => {
            state.userInfo = {
                id: "",
                name: "",
                email: "",
                address: "",
                profession: "",
            };
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { setEmail, setUser, setAccessToken, setRefreshToken, removeUser } = authSlice.actions;
export default authSlice.reducer;