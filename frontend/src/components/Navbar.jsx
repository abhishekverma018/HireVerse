import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, User as UserIcon, Briefcase, Building, ChevronDown, Menu, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import { USER_API_END_POINT } from "../utils/constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong during logout.");
    }
  };

  return (
    <nav className="glass-nav sticky top-0 z-50 w-full px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-white tracking-tight">
          <Briefcase className="h-5.5 w-5.5 text-indigo-500" />
          <span>HireVerse</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {user && user.role === "recruiter" ? (
            <>
              <Link to="/admin/companies" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                Companies
              </Link>
              <Link to="/admin/jobs" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                Jobs
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                Home
              </Link>
              <Link to="/jobs" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                Jobs
              </Link>
            </>
          )}
        </div>

        {/* User Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-dark-card border border-dark-border hover:border-zinc-700 rounded-full py-1 px-2.5 transition-all duration-200 cursor-pointer"
              >
                <img
                  src={user.profile?.profilePhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"}
                  alt="avatar"
                  className="h-7 w-7 rounded-full object-cover border border-zinc-800"
                />
                <span className="text-zinc-300 max-w-[120px] truncate text-sm font-medium">{user.fullname}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-50 rounded-xl bg-dark-card border border-dark-border p-1.5 shadow-2xl animate-fade-in-up">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center space-x-2.5 rounded-lg px-2.5 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>View Profile</span>
                  </Link>

                  {user.role === "recruiter" && (
                    <Link
                      to="/admin/companies"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center space-x-2.5 rounded-lg px-2.5 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      <Building className="h-4 w-4" />
                      <span>Recruiter Panel</span>
                    </Link>
                  )}

                  <hr className="my-1 border-dark-border" />
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logoutHandler();
                    }}
                    className="flex w-full items-center space-x-2.5 rounded-lg px-2.5 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login" className="px-3.5 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/signup" className="px-4.5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-violet-400 p-2 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-dark-card/95 border border-dark-border rounded-2xl p-4 shadow-xl flex flex-col space-y-4 animate-fade-in-up">
          {user && user.role === "recruiter" ? (
            <>
              <Link to="/admin/companies" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-violet-400 font-medium transition-colors">
                Companies
              </Link>
              <Link to="/admin/jobs" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-violet-400 font-medium transition-colors">
                Jobs
              </Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-violet-400 font-medium transition-colors">
                Home
              </Link>
              <Link to="/jobs" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-violet-400 font-medium transition-colors">
                Jobs
              </Link>
            </>
          )}

          <hr className="border-dark-border" />

          {user ? (
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <img
                  src={user.profile?.profilePhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"}
                  alt="avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-gray-200 font-semibold">{user.fullname}</div>
                  <div className="text-gray-400 text-xs truncate max-w-[150px]">{user.email}</div>
                </div>
              </div>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 py-2 text-sm text-gray-300 hover:text-violet-400 transition-colors"
              >
                <UserIcon className="h-4 w-4" />
                <span>My Profile</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logoutHandler();
                }}
                className="flex w-full items-center space-x-2 py-2 text-sm text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-dark-border text-sm font-medium text-gray-300 hover:text-white hover:bg-violet-600/10 hover:border-violet-500/20 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
