import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Check, X, FileText, Phone, Mail } from "lucide-react";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

const ApplicantsTable = ({ onStatusUpdate }) => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        if (onStatusUpdate) {
          onStatusUpdate();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update status.");
    }
  };

  return (
    <div className="w-full bg-[#121420]/80 border border-dark-border rounded-2xl overflow-hidden animate-fade-in-up">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-dark-border">
          <thead className="bg-[#121420]">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Candidate</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Skills</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Resume</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border/40 bg-[#121420]/20">
            {!applicants || applicants.applications?.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-400">
                  No applicants for this job yet.
                </td>
              </tr>
            ) : (
              applicants.applications.map((app) => (
                <tr key={app._id} className="hover:bg-violet-600/5 transition-all">
                  {/* Candidate Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 bg-violet-600/10 border border-violet-500/20 rounded-full flex items-center justify-center font-bold text-violet-400">
                        {app.applicant?.fullname?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{app.applicant?.fullname}</div>
                        <div className="text-xs text-gray-400 line-clamp-1 max-w-[200px]">{app.applicant?.profile?.bio || "No bio added"}</div>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-200 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-gray-500" />
                      {app.applicant?.email}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                      <Phone className="h-3.5 w-3.5 text-gray-500" />
                      {app.applicant?.phoneNumber}
                    </div>
                  </td>

                  {/* Skills */}
                  <td className="px-6 py-4 whitespace-normal max-w-[220px]">
                    <div className="flex flex-wrap gap-1">
                      {app.applicant?.profile?.skills?.length > 0 ? (
                        app.applicant.profile.skills.map((skill, idx) => (
                          <span key={idx} className="text-[10px] font-bold text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded border border-pink-500/10">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">None</span>
                      )}
                    </div>
                  </td>

                  {/* Resume */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {app.applicant?.profile?.resume ? (
                      <a
                        href={app.applicant.profile.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-1 bg-violet-500/10 border border-violet-500/10 px-2.5 py-1 rounded-lg"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Resume</span>
                      </a>
                    ) : (
                      <span className="text-gray-500">Not Uploaded</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        app.status === "accepted"
                          ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                          : app.status === "rejected"
                          ? "text-red-400 bg-red-500/10 border-red-500/20"
                          : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => statusHandler("Accepted", app._id)}
                      disabled={app.status === "accepted"}
                      className={`inline-flex items-center p-1.5 rounded-lg border text-emerald-400 hover:text-white hover:bg-emerald-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-emerald-400 cursor-pointer ${
                        app.status === "accepted" ? "border-emerald-500/20 bg-emerald-500/5" : "border-emerald-500/20 hover:border-emerald-500"
                      }`}
                      title="Accept Application"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => statusHandler("Rejected", app._id)}
                      disabled={app.status === "rejected"}
                      className={`inline-flex items-center p-1.5 rounded-lg border text-red-400 hover:text-white hover:bg-red-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-red-400 cursor-pointer ${
                        app.status === "rejected" ? "border-red-500/20 bg-red-500/5" : "border-red-500/20 hover:border-red-500"
                      }`}
                      title="Reject Application"
                    >
                      <X className="h-4 w-4" />
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

export default ApplicantsTable;
