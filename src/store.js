import { configureStore } from "@reduxjs/toolkit";
import userSLice from "./features/user/userSLice";
import jobSlice from "./features/job/jobSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";



export const store = configureStore({
    reducer:{
        user : userSLice,
        job : jobSlice,
        allJobs : allJobsSlice,
    }
})



