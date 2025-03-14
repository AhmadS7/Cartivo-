import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
    import axios from 'axios';

    interface AuthState {
      isAuthenticated: boolean;
      isAdmin: boolean;
      token: string | null;
      loading: boolean;
      error: string | null;
    }

    const initialState: AuthState = {
      isAuthenticated: false,
      isAdmin: false,
      token: null,
      loading: false,
      error: null,
    };

    // Replace with your actual API endpoint
    const API_BASE_URL = '/api'; // Using relative path for proxying

    // Async thunk for checking authentication status
    export const checkAuth = createAsyncThunk<{ isAuthenticated: boolean; isAdmin: boolean }, void>(
      'auth/checkAuth',
      async (_, { rejectWithValue }) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            return { isAuthenticated: false, isAdmin: false };
          }

          // You might need to decode the token to check for admin role.  This is a placeholder.
          const isAdmin = token.includes('admin'); // Replace with actual JWT decoding and role check

          return { isAuthenticated: true, isAdmin };
        } catch (error) {
          return rejectWithValue('Failed to check authentication');
        }
      }
    );

    const authSlice = createSlice({
      name: 'auth',
      initialState,
      reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string; isAdmin: boolean }>) => {
          state.isAuthenticated = true;
          state.isAdmin = action.payload.isAdmin;
          state.token = action.payload.token;
          state.loading = false;
          state.error = null;
          localStorage.setItem('token', action.payload.token); // Store token
        },
        loginFailure: (state, action: PayloadAction<string>) => {
          state.isAuthenticated = false;
          state.isAdmin = false;
          state.token = null;
          state.loading = false;
          state.error = action.payload;
        },
        logout: (state) => {
          state.isAuthenticated = false;
          state.isAdmin = false;
          state.token = null;
          localStorage.removeItem('token'); // Remove token
        },
      },
      extraReducers: (builder) => {
        builder
          .addCase(checkAuth.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(checkAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.isAdmin = action.payload.isAdmin;
          })
          .addCase(checkAuth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });
      },
    });

    export const { loginSuccess, loginFailure, logout } = authSlice.actions;
    export default authSlice.reducer;
