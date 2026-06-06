import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { User, Mail, Phone, BookOpen, FileText, Edit2, X, Loader2, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { setUser } from "../redux/authSlice";
import { setAllApplications } from "../redux/applicationSlice";
import { USER_API_END_POINT, APPLICATION_API_END_POINT } from "../utils/constant";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const { allApplications } = useSelector((store) => store.application);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFormData({
        fullname: user.fullname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(", ") || "",
      });
    }
  }, [user, navigate]);

  // Fetch applied jobs
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllApplications(res.data.application));
        }
      } catch (error) {
        console.error("Fetch applied jobs error:", error);
        // If 404 No Applications, clear list
        if (error.response?.status === 404) {
          dispatch(setAllApplications([]));
        }
      }
    };
    fetchAppliedJobs();
  }, [user, dispatch]);

  const changeEventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full space-y-8 animate-fade-in-up">
        
        {/* Profile Card */}
        <div className="glass-card p-8 rounded-3xl border border-dark-border/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={user?.profile?.profilePhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
                alt="Profile"
                className="h-24 w-24 rounded-2xl object-cover border border-violet-500/20"
              />
              <div className="text-center sm:text-left space-y-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">{user?.fullname}</h1>
                <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                  {user?.profile?.bio || "Add a short bio to introduce yourself."}
                </p>
                
                {/* Contact Badges */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-4 pt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4 text-gray-500" />
                    {user?.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4 text-gray-500" />
                    {user?.phoneNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setOpen(true)}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#1e2238]/50 border border-dark-border hover:border-violet-500/50 hover:bg-violet-600/10 text-gray-200 hover:text-violet-400 px-5 py-2.5 rounded-2xl transition-all cursor-pointer font-bold text-sm"
            >
              <Edit2 className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          </div>

          <hr className="my-8 border-dark-border/40" />

          {/* Skills & Resume details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Skills */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-pink-400" />
                <span>Skills</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {user?.profile?.skills?.length > 0 ? (
                  user.profile.skills.map((skill, idx) => (
                    <span key={idx} className="text-xs font-semibold text-pink-400 bg-pink-500/10 px-3.5 py-1.5 rounded-full border border-pink-500/10">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">No skills added yet.</span>
                )}
              </div>
            </div>

            {/* Resume */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-violet-400" />
                <span>Resume Link / Bio CV</span>
              </h3>
              {user?.profile?.resume ? (
                <div className="flex items-center gap-3">
                  <a
                    href={user.profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="text-violet-400 hover:text-violet-300 font-semibold text-sm underline inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/10 px-4 py-2 rounded-2xl"
                  >
                    <FileText className="h-4.5 w-4.5" />
                    <span>View CV / Resume File</span>
                  </a>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No CV link uploaded. Use edit profile to specify a resume link.</p>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-white">Applied Jobs</h2>
          
          <div className="w-full bg-[#121420]/80 border border-dark-border rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-dark-border">
                <thead className="bg-[#121420]">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Job Role</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Company</th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border/40 bg-[#121420]/20">
                  {!allApplications || allApplications.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-gray-400 text-sm">
                        You have not applied for any jobs yet.
                      </td>
                    </tr>
                  ) : (
                    allApplications.map((app) => (
                      <tr key={app._id} className="hover:bg-violet-600/5 transition-colors">
                        {/* Date */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        
                        {/* Job Role */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-200">{app.job?.title}</div>
                          <div className="text-xs text-violet-400 font-medium">{app.job?.jobType}</div>
                        </td>

                        {/* Company */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-semibold">
                          {app.job?.company?.name}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>

      {/* Edit Profile Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in-up">
          <div className="w-full max-w-lg bg-dark-card border border-dark-border rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full border border-dark-border/40 hover:border-violet-500/30 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-extrabold text-white mb-6">Edit Profile</h2>

            <form onSubmit={submitHandler} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={changeEventHandler}
                  className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeEventHandler}
                  className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={changeEventHandler}
                  className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                  required
                />
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400">Bio</label>
                <textarea
                  name="bio"
                  rows="3"
                  value={formData.bio}
                  onChange={changeEventHandler}
                  className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none resize-none"
                />
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400">Skills (Comma Separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={changeEventHandler}
                  placeholder="e.g. React, Node.js, Python"
                  className="w-full bg-[#1e2238]/30 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-lg hover:shadow-violet-600/20 transition-all disabled:opacity-50 mt-6 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
