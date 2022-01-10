import { User } from './../../models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginPayLoad {
  username: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean; // for loading state
  currentUser: User | undefined;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayLoad>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    loginFail(state, action: PayloadAction<string>) {
      state.logging = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// actions
export const authActions = authSlice.actions;

// selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectLoggedIn = (state: any) => state.auth.logging;

// reducers
const authReducer = authSlice.reducer;
export default authReducer;
