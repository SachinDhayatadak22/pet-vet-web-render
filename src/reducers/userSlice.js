import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPOST } from '../utils/apiHelper';
import { axiosApi } from '../services/axios';
import { toast } from 'react-toastify';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userDetails, { rejectWithValue }) => {
    
    const role = userDetails?.role;
    const validRoles = ["admin", "vet", "nurse"];

    if (!validRoles.includes(role)) {
      return rejectWithValue("Invalid role provided.");
    }
    try {
      const response = await apiPOST(`/${role}/login`, userDetails);
      const result = response?.data;
      if (result?.code === 200) {
        localStorage.setItem('accesstoken', result.data.tokens.access.token);
        localStorage.setItem('refreshToken', result.data.tokens.refresh.token);
        return result.data.user;
      } else {
        toast.error(result?.message || "Sign in failed. Please verify your credentials and try again.")
        return rejectWithValue(result?.message);
      }
    } catch (error) {
      console.error("error", error);
      return rejectWithValue("An error occurred. Please try again.");
    }
  }
);

export const addUserAction = createAsyncThunk(
  'user/addUser',
  async (token, { rejectWithValue }) => {
    console.log("GETcUURENT USER");

    try {
      const response = await axiosApi.get(`/auth/get-current-user`, { token: token })
      if (response?.data.data) {
        let userData = response.data.data.userData
        console.log("userData", userData);
        return userData
      }
    } catch (error) {

    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    logoutAction: (state) => {
      state.user = {};
      localStorage.removeItem('accesstoken');
      localStorage.removeItem('refreshToken');
      window.location.reload();
    },
    addUserAction: (state) => {
      console.log("action", action);

      state.user = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAction } = userSlice.actions;
export default userSlice.reducer;
