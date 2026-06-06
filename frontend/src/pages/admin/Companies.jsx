import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Search } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CompaniesTable from "../../components/admin/CompaniesTable";
import useGetCompanies from "../../hooks/useGetCompanies";
import { setSearchCompanyText } from "../../redux/companySlice";

const Companies = () => {
  useGetCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth);

  // Redirect non-recruiters
  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(setSearchCompanyText(input));
  }, [input, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full space-y-6">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Registered Companies</h1>
            <p className="text-sm text-gray-400 mt-1">Manage and edit your registered companies.</p>
          </div>
          <button
            onClick={() => navigate("/admin/companies/create")}
            className="inline-flex items-center justify-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-lg hover:shadow-violet-600/20 transition-all cursor-pointer"
          >
            <Plus className="h-4.5 w-4.5" />
            <span>New Company</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 bg-[#121420]/80 p-3 border border-dark-border rounded-2xl w-full max-w-md focus-within:border-violet-500/50 transition-all shadow-md">
          <Search className="h-5 w-5 text-gray-500 shrink-0" />
          <input
            type="text"
            placeholder="Filter companies by name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent text-gray-200 border-none outline-none focus:ring-0 text-sm"
          />
        </div>

        {/* Companies Grid/Table */}
        <CompaniesTable />

      </main>

      <Footer />
    </div>
  );
};

export default Companies;
