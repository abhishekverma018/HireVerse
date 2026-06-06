import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { ChevronLeft, Building, Loader2, Save } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useGetCompanyById from "../../hooks/useGetCompanyById";
import { COMPANY_API_END_POINT } from "../../utils/constant";

const CompanySetup = () => {
  const { id: companyId } = useParams();
  useGetCompanyById(companyId);

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: "",
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        logo: singleCompany.logo || "",
      });
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.name) {
      toast.error("Company name is required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${companyId}`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full">
        {/* Back Link */}
        <Link to="/admin/companies" className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-violet-400 gap-1 mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Back to Companies
        </Link>

        <div className="w-full bg-[#121420]/80 border border-dark-border p-8 rounded-3xl shadow-2xl relative overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-2xl">
              <Building className="h-6 w-6 text-violet-400" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Company Setup</h1>
              <p className="text-gray-400 text-xs mt-0.5">Specify locations, description, and logo details.</p>
            </div>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Company Name</label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                  required
                />
              </div>

              {/* Website */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Website URL</label>
                <input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="https://example.com"
                  className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Location (City, Country)</label>
                <input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="e.g. Bangalore, India"
                  className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                />
              </div>

              {/* Logo URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Logo Image URL</label>
                <input
                  type="text"
                  name="logo"
                  value={input.logo}
                  onChange={changeEventHandler}
                  placeholder="https://example.com/logo.png"
                  className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400">Company Description</label>
              <textarea
                name="description"
                rows="4"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Talk about your company's mission, values, work etc."
                className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-lg hover:shadow-violet-600/20 transition-all disabled:opacity-50 mt-6 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  <span>Saving information...</span>
                </>
              ) : (
                <>
                  <Save className="h-4.5 w-4.5" />
                  <span>Update Setup</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanySetup;
