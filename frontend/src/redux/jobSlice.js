import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    adminJobs: [],
    singleJob: null,
    searchKeyword: "",
    filterQueries: {
      location: "",
      salary: "",
      jobType: ""
    }
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setFilterQueries: (state, action) => {
      state.filterQueries = { ...state.filterQueries, ...action.payload };
    },
    resetFilters: (state) => {
      state.filterQueries = { location: "", salary: "", jobType: "" };
      state.searchKeyword = "";
    }
  },
});

export const { 
  setAllJobs, 
  setAdminJobs, 
  setSingleJob, 
  setSearchKeyword, 
  setFilterQueries,
  resetFilters
} = jobSlice.actions;

export default jobSlice.reducer;
