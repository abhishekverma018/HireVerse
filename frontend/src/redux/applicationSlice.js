import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    allApplications: [],
    applicants: null,
  },
  reducers: {
    setAllApplications: (state, action) => {
      state.allApplications = action.payload;
    },
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export const { setAllApplications, setApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
