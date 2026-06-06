import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Building, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { setSingleCompany } from "../../redux/companySlice";
import { COMPANY_API_END_POINT } from "../../utils/constant";

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerNewCompany = async (e) => {
    e.preventDefault();
    if (!companyName.trim()) {
      toast.error("Company name is required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res.data.company._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to register company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-6 py-16 flex-grow w-full flex items-center justify-center">
        <div className="w-full bg-[#121420]/80 border border-dark-border p-8 rounded-3xl shadow-2xl relative overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-2xl">
              <Building className="h-6 w-6 text-violet-400" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Create Company</h1>
              <p className="text-gray-400 text-xs mt-0.5">Let's register your company in the portal.</p>
            </div>
          </div>

          <form onSubmit={registerNewCompany} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300">Company Name</label>
              <input
                type="text"
                placeholder="Google, Microsoft, Meta etc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-3 text-sm text-gray-200 outline-none"
                required
              />
              <p className="text-xs text-gray-500">
                You can configure location, website, description, and logo in the next step.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/admin/companies")}
                className="w-1/2 py-3.5 rounded-xl border border-dark-border text-sm font-bold text-gray-400 hover:text-white hover:bg-violet-600/10 hover:border-violet-500/25 transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-lg hover:shadow-violet-600/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyCreate;
