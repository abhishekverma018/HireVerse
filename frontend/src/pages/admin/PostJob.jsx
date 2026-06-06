import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { ChevronLeft, Plus, Loader2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useGetCompanies from "../../hooks/useGetCompanies";
import { JOB_API_END_POINT } from "../../utils/constant";

const PostJob = () => {
  useGetCompanies();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "Full-time",
    experience: "",
    position: "",
    companyId: "",
  });

  // Pre-select first company if available
  useEffect(() => {
    if (companies && companies.length > 0 && !input.companyId) {
      setInput((prev) => ({ ...prev, companyId: companies[0]._id }));
    }
  }, [companies, input.companyId]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e) => {
    setInput({ ...input, companyId: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.title || !input.description || !input.requirements || !input.salary || !input.location || !input.jobType || !input.experience || !input.position || !input.companyId) {
      toast.error("Please fill in all the details.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full">
        {/* Back Link */}
        <Link to="/admin/jobs" className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-violet-400 gap-1 mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Back to Jobs
        </Link>

        <div className="w-full bg-[#121420]/80 border border-dark-border p-8 rounded-3xl shadow-2xl relative overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between mb-8 pb-4 border-b border-dark-border/40">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Post New Job</h1>
              <p className="text-gray-400 text-xs mt-0.5">Fill in the specifications to announce a job opening.</p>
            </div>
          </div>

          {companies.length === 0 ? (
            <div className="text-center py-10 space-y-4">
              <p className="text-gray-400">
                You must register at least one company before you can post a job.
              </p>
              <button
                onClick={() => navigate("/admin/companies/create")}
                className="inline-flex items-center gap-1 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg hover:shadow-violet-600/20 transition-all cursor-pointer"
              >
                <Plus className="h-4.5 w-4.5" />
                <span>Register a Company Now</span>
              </button>
            </div>
          ) : (
            <form onSubmit={submitHandler} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={changeEventHandler}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                    required
                  />
                </div>

                {/* Company Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">Assign Company</label>
                  <select
                    value={input.companyId}
                    onChange={selectChangeHandler}
                    className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none select-style"
                    required
                  >
                    {companies.map((company) => (
                      <option key={company._id} value={company._id} className="bg-dark-card text-gray-300">
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Requirements */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">Skills / Requirements (Comma Separated)</label>
                  <input
                    type="text"
                    name="requirements"
                    value={input.requirements}
                    onChange={changeEventHandler}
                    placeholder="React, Redux, Node, TypeScript"
                    className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                    required
                  />
                </div>

                {/* Salary */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">Salary (LPA)</label>
                  <input
                    type="number"
                    name="salary"
                    value={input.salary}
                    onChange={changeEventHandler}
                    placeholder="e.g. 12"
                    className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    placeholder="e.g. Bangalore, Noida, Remote"
                    className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                    required
                  />
                </div>

                {/* Job Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">Job Type</label>
                  <select
                    name="jobType"
                    value={input.jobType}
                    onChange={changeEventHandler}
                    className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                    required
                  >
                    <option value="Full-time" className="bg-dark-card">Full-time</option>
                    <option value="Part-time" className="bg-dark-card">Part-time</option>
                    <option value="Contract" className="bg-dark-card">Contract</option>
                    <option value="Internship" className="bg-dark-card">Internship</option>
                  </select>
                </div>

                {/* Experience */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">Experience Required (Years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={input.experience}
                    onChange={changeEventHandler}
                    placeholder="e.g. 3"
                    className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                    required
                  />
                </div>

                {/* Positions */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">Positions Available</label>
                  <input
                    type="number"
                    name="position"
                    value={input.position}
                    onChange={changeEventHandler}
                    placeholder="e.g. 5"
                    className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Detailed Job Description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Detail the roles, day-to-day duties, background context, expected deliverables..."
                  className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none resize-none"
                  required
                />
              </div>

              {/* Actions */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-lg hover:shadow-violet-600/20 transition-all disabled:opacity-50 mt-6 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    <span>Creating job posting...</span>
                  </>
                ) : (
                  "Post Job Listing"
                )}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostJob;
