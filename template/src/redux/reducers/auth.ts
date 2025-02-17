/* eslint-disable */
import { User } from "@models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  userData: User;
  isLoading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  userData: {
    id: 0,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: "",
    accessToken: "",
    refreshToken: ""
  },
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    hasError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
  },
});

export const { saveUserData, hasError } = authSlice.actions;

export default authSlice.reducer;
