import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  //Xu lí all job
  isLoading: false,
  jobs: [],
  //Xử lì filter
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  //Xử lí stats
  stats: {},
  monthlyApplications: [],
  //Xử lí filter
  ...initialFiltersState,
};

export const showStats = createAsyncThunk("allJobs/showStats", async(_,thunkAPI)=>{
  try{
const resp = await customFetch.get('/jobs/stats',{
  headers: {
    authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
  }
});
console.log(resp.data);
return resp.data;
  }
  catch(e){
          return thunkAPI.rejectWithValue(e.response.data.msg)
  }

})

export const getAllJobs = createAsyncThunk(
  'allJobs/getAllJobs',
  async (_, thunkAPI) => {
    const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }
   

    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
    console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,



  reducers:{
    showLoading:(state)=>{
      state.isLoading = true;
    },
    hideLoading:(state)=>{
      state.isLoading = true;
    },
    updateSearchFilters: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
   clearFilters : (state) =>{
    return {...state,...initialFiltersState}
   },
   changePage : (state,{payload})=>{
         state.page =payload;
   },
   clearAllJobsState: () => initialState,
  },



  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
      state.numOfPages = payload.numOfPages;
      state.totalJobs = payload.totalJobs;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [showStats.pending]: (state) => {
      state.isLoading = true;
    },
    [showStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stats= payload.defaultStats
      state.monthlyApplications = payload.monthlyApplications
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
}
});
export const {showLoading,hideLoading,updateSearchFilters,clearFilters,filter,changePage,clearAllJobsState} = allJobsSlice.actions;
export default allJobsSlice.reducer;