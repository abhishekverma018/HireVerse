import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    singleCompany: null,
    searchCompanyText: "",
  },
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setSearchCompanyText: (state, action) => {
      state.searchCompanyText = action.payload;
    },
  },
});

export const { setCompanies, setSingleCompany, setSearchCompanyText } = companySlice.actions;
export default companySlice.reducer;
