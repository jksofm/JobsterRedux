import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserToLocalStorage,
  removeUserToLocalStorage
} from "../../utils/localStorage";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";
const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserToLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);
      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);
export const updateUser = createAsyncThunk("user/updateUser",async(user,thunkAPI)=>{
  try {
    const resp = await customFetch.patch("/auth/updateUser", user,{
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      }
    });
    return resp.data;
  } catch (e) {
    if(e.response.status === 401){
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging out...")

    }
    return thunkAPI.rejectWithValue(e.response.data.msg);
  }
})
export const clearStore = createAsyncThunk('user/clearStore', async (message, thunkAPI) => {
  try {
    // logout user
    thunkAPI.dispatch(logoutUser(message));
    // clear jobs value
    thunkAPI.dispatch(clearAllJobsState());
    // clear job input values
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    // console.log(error);
    return Promise.reject();
  }
});



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
     toggleSidebar: (state)=>{
      state.isSidebarOpen = !state.isSidebarOpen;
     },
     logoutUser : (state,{payload})=>{
      state.user = null;
      state.isSidebarOpen = false;
      removeUserToLocalStorage();
       if(payload){
        toast.success(payload);
       }
     }
  },
  extraReducers: {
    //Register
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello ${user.name} !`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;

      toast.error(payload);
    },
     // Login
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
   
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const { user } = payload;
      addUserToLocalStorage(user);

      state.user = user;
      toast.success(`Welcome ${user.name} !`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    // Update
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const { user } = payload;
      addUserToLocalStorage(user);

      state.user = user;
      toast.success(`Successfully updated ${user.name}`);
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [clearStore.rejected] : (state, { payload }) => {
      toast.error('There was an error');
    }
  },
});

export default userSlice.reducer;
export const {toggleSidebar,logoutUser} = userSlice.actions;