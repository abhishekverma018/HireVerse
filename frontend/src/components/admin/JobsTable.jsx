import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Users, Edit2, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "../../utils/constant";
import { setAdminJobs } from "../../redux/jobSlice";

const JobsTable = () => {
  const { adminJobs, searchKeyword } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(adminJobs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteJobHandler = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job listing?")) return;
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        const updatedJobs = adminJobs.filter((job) => job._id !== jobId);
        dispatch(setAdminJobs(updatedJobs));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete job.");
    }
  };

  useEffect(() => {
    const filtered = adminJobs.filter((job) => {
      if (!searchKeyword) return true;
      return (
        job?.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    });
    setFilterJobs(filtered);
  }, [adminJobs, searchKeyword]);

  return (
    <div className="w-full bg-[#121420]/80 border border-dark-border rounded-2xl overflow-hidden animate-fade-in-up">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-dark-border">
          <thead className="bg-[#121420]">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Company</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Job Title</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Positions</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date Posted</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border/40 bg-[#121420]/20">
            {filterJobs.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                  No jobs posted yet.
                </td>
              </tr>
            ) : (
              filterJobs.map((job) => (
                <tr key={job._id} className="hover:bg-violet-600/5 transition-all">
                  {/* Company Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-white">{job?.company?.name || "Company"}</div>
                    <div className="text-xs text-gray-400">{job?.location}</div>
                  </td>

                  {/* Job Title */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-200">{job?.title}</div>
                    <div className="text-xs text-violet-400 font-medium">{job?.jobType}</div>
                  </td>

                  {/* Positions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {job?.position}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(job?.createdAt).toLocaleDateString()}
                  </td>

                  {/* Action dropdown or buttons */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="inline-flex items-center space-x-1 bg-violet-600/10 border border-violet-500/20 hover:border-violet-500 hover:bg-violet-600 text-violet-400 hover:text-white px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <Users className="h-4 w-4" />
                      <span>Applicants ({job?.applications?.length || 0})</span>
                    </button>
                    
                    <button
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      className="inline-flex items-center space-x-1 bg-blue-600/10 border border-blue-500/20 hover:border-blue-500 hover:bg-blue-600 text-blue-400 hover:text-white px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => deleteJobHandler(job._id)}
                      className="inline-flex items-center space-x-1 bg-red-600/10 border border-red-500/20 hover:border-red-500 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsTable;
