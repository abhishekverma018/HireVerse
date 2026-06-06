import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { User as UserIcon, Mail, Phone, Lock, Loader2, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { setLoading } from "../redux/authSlice";
import { USER_API_END_POINT } from "../utils/constant";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "recruiter") {
        navigate("/admin/companies");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
      toast.error("Please fill in all details.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-6 py-12 relative">
        <div className="w-full max-w-md bg-dark-card border border-dark-border p-8 rounded-2xl shadow-xl relative z-10 animate-fade-in-up">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
            <p className="text-zinc-400 text-xs mt-1.5">Sign up to apply for jobs and build your career.</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-400">Full Name</label>
              <div className="flex items-center gap-2.5 bg-[#18181b]/30 border border-dark-border rounded-xl px-3.5 py-2.5 focus-within:border-indigo-500/50">
                <UserIcon className="h-4.5 w-4.5 text-zinc-500 shrink-0" />
                <input
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                  className="w-full bg-transparent text-zinc-200 border-none outline-none focus:ring-0 text-sm"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-400">Email Address</label>
              <div className="flex items-center gap-2.5 bg-[#18181b]/30 border border-dark-border rounded-xl px-3.5 py-2.5 focus-within:border-indigo-500/50">
                <Mail className="h-4.5 w-4.5 text-zinc-500 shrink-0" />
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="name@example.com"
                  className="w-full bg-transparent text-zinc-200 border-none outline-none focus:ring-0 text-sm"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-400">Phone Number</label>
              <div className="flex items-center gap-2.5 bg-[#18181b]/30 border border-dark-border rounded-xl px-3.5 py-2.5 focus-within:border-indigo-500/50">
                <Phone className="h-4.5 w-4.5 text-zinc-500 shrink-0" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="1234567890"
                  className="w-full bg-transparent text-zinc-200 border-none outline-none focus:ring-0 text-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-400">Password</label>
              <div className="flex items-center gap-2.5 bg-[#18181b]/30 border border-dark-border rounded-xl px-3.5 py-2.5 focus-within:border-indigo-500/50">
                <Lock className="h-4.5 w-4.5 text-zinc-500 shrink-0" />
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-zinc-200 border-none outline-none focus:ring-0 text-sm"
                  required
                />
              </div>
            </div>

            {/* Role Radio */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Select Role</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-center gap-2 border rounded-xl py-2.5 px-4 text-xs font-semibold cursor-pointer transition-all select-none ${
                  input.role === "student"
                    ? "border-indigo-600 bg-indigo-500/5 text-indigo-400"
                    : "border-dark-border bg-[#18181b]/20 text-zinc-500 hover:border-zinc-700"
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="sr-only"
                  />
                  <span>Student</span>
                </label>

                <label className={`flex items-center justify-center gap-2 border rounded-xl py-2.5 px-4 text-xs font-semibold cursor-pointer transition-all select-none ${
                  input.role === "recruiter"
                    ? "border-indigo-600 bg-indigo-500/5 text-indigo-400"
                    : "border-dark-border bg-[#18181b]/20 text-zinc-500 hover:border-zinc-700"
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="sr-only"
                  />
                  <span>Recruiter</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-indigo-600/10 transition-all disabled:opacity-50 mt-4 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-zinc-500 text-xs text-center mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
