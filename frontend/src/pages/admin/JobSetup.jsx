import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { ChevronLeft, Briefcase, Loader2, Save } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useGetSingleJob from "../../hooks/useGetSingleJob";
import useGetCompanies from "../../hooks/useGetCompanies";
import { JOB_API_END_POINT } from "../../utils/constant";
import { setSingleJob } from "../../redux/jobSlice";

const JobSetup = () => {
  const { id: jobId } = useParams();
  useGetSingleJob(jobId);
  useGetCompanies();

  const { singleJob } = useSelector((store) => store.job);
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements ? singleJob.requirements.join(", ") : "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "Full-time",
        experience: singleJob.experienceLevel || "",
        position: singleJob.position || "",
        companyId: singleJob.company?._id || singleJob.company || "",
      });
    }
  }, [singleJob]);

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
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${jobId}`,
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
        dispatch(setSingleJob(res.data.job));
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update job listing.");
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

          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-2xl">
              <Briefcase className="h-6 w-6 text-violet-400" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Job Setup</h1>
              <p className="text-gray-400 text-xs mt-0.5">Specify job details, salary, requirement, and company.</p>
            </div>
          </div>

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
                  <option value="" disabled className="bg-dark-card text-gray-400">Select a company</option>
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
                placeholder="Detail the roles, day-to-day duties..."
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
                  <span>Updating job listing...</span>
                </>
              ) : (
                <>
                  <Save className="h-4.5 w-4.5" />
                  <span>Update Listing</span>
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

export default JobSetup;
