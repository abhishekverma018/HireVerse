import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { MapPin, DollarSign, Calendar, Users, Briefcase, ChevronLeft, Building, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useGetSingleJob from "../hooks/useGetSingleJob";
import { setSingleJob } from "../redux/jobSlice";
import { APPLICATION_API_END_POINT } from "../utils/constant";

const JobDetails = () => {
  const { id: jobId } = useParams();
  useGetSingleJob(jobId);
  
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [isApplied, setIsApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (singleJob && user) {
      const alreadyApplied = singleJob?.applications?.some(
        (app) => app.applicant === user._id || app.applicant?._id === user._id
      );
      setIsApplied(alreadyApplied || false);
    }
  }, [singleJob, user]);

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Please login to apply for this job.");
      return;
    }
    if (user.role === "recruiter") {
      toast.error("Recruiters cannot apply for jobs.");
      return;
    }

    try {
      setApplying(true);
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        // Update local redux state for singleJob applications to stay in sync
        const updatedApplications = [
          ...(singleJob.applications || []),
          { applicant: user._id }
        ];
        dispatch(setSingleJob({ ...singleJob, applications: updatedApplications }));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to apply for the job.");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full">
        {/* Back Link */}
        <Link to="/jobs" className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-violet-400 gap-1 mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Back to Jobs
        </Link>

        {!singleJob ? (
          <div className="glass-card rounded-2xl p-16 text-center text-gray-400 border border-dark-border/40">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-violet-500 mb-4" />
            Loading job details...
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in-up">
            {/* Header Glass Card */}
            <div className="glass-card p-8 rounded-3xl border border-dark-border/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-4">
                  {/* Title & Type */}
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-extrabold text-white">{singleJob.title}</h1>
                    <span className="text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
                      {singleJob.jobType}
                    </span>
                  </div>

                  {/* Company Info */}
                  <div className="flex items-center gap-2 text-gray-300 font-semibold">
                    <Building className="h-5 w-5 text-gray-500" />
                    <span>{singleJob.company?.name}</span>
                  </div>

                  {/* Stats Grid */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {singleJob.location}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-emerald-400">
                      <DollarSign className="h-4 w-4 text-emerald-500" />
                      {singleJob.salary} LPA
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      Posted {new Date(singleJob.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Apply Button */}
                <div>
                  <button
                    onClick={applyJobHandler}
                    disabled={isApplied || applying}
                    className={`w-full md:w-auto px-8 py-4 rounded-2xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isApplied
                        ? "bg-[#1e2238]/50 border border-dark-border text-gray-500 cursor-not-allowed shadow-none"
                        : "bg-violet-600 hover:bg-violet-700 text-white hover:shadow-violet-600/20"
                    }`}
                  >
                    {applying ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Applying...</span>
                      </>
                    ) : isApplied ? (
                      "Already Applied"
                    ) : (
                      "Apply Now"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Content Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Main Info */}
              <div className="md:col-span-2 space-y-6">
                
                {/* Description */}
                <div className="glass-card p-6 rounded-2xl border border-dark-border/40">
                  <h3 className="text-lg font-bold text-white mb-4">Job Description</h3>
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                    {singleJob.description}
                  </p>
                </div>

                {/* Requirements */}
                <div className="glass-card p-6 rounded-2xl border border-dark-border/40">
                  <h3 className="text-lg font-bold text-white mb-4">Requirements & Skills</h3>
                  {singleJob.requirements?.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {singleJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0"></span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No specific requirements mentioned.</p>
                  )}
                </div>

              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                
                {/* Overview */}
                <div className="glass-card p-6 rounded-2xl border border-dark-border/40 space-y-4">
                  <h3 className="text-lg font-bold text-white pb-3 border-b border-dark-border/40">Job Overview</h3>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-violet-500/10 border border-violet-500/10 rounded-xl">
                      <Briefcase className="h-5 w-5 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Experience Level</div>
                      <div className="text-sm font-semibold text-gray-300">{singleJob.experienceLevel} Years</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-pink-500/10 border border-pink-500/10 rounded-xl">
                      <Users className="h-5 w-5 text-pink-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Available Vacancies</div>
                      <div className="text-sm font-semibold text-gray-300">{singleJob.position} Openings</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/10 border border-blue-500/10 rounded-xl">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Total Applicants</div>
                      <div className="text-sm font-semibold text-gray-300">{singleJob.applications?.length || 0} Candidates</div>
                    </div>
                  </div>
                </div>

                {/* About Company */}
                <div className="glass-card p-6 rounded-2xl border border-dark-border/40 space-y-3">
                  <h3 className="text-lg font-bold text-white pb-3 border-b border-dark-border/40">About Company</h3>
                  <h4 className="text-sm font-bold text-gray-300">{singleJob.company?.name}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {singleJob.company?.description || "No description provided for this company."}
                  </p>
                  {singleJob.company?.website && (
                    <a
                      href={singleJob.company.website.startsWith("http") ? singleJob.company.website : `https://${singleJob.company.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-violet-400 hover:underline block pt-2"
                    >
                      Visit website
                    </a>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default JobDetails;
