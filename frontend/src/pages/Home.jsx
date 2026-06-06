import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryCarousel from "../components/CategoryCarousel";
import LatestJobs from "../components/LatestJobs";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { setSearchKeyword } from "../redux/jobSlice";
import { Search, ChevronRight } from "lucide-react";

const Home = () => {
  useGetAllJobs();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchKeyword(query));
    navigate("/jobs");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-24 overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center z-10 animate-fade-in-up">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/5 px-3.5 py-1.5 rounded-full border border-indigo-500/10 mb-6">
            Discover Opportunities
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white max-w-3xl">
            Find and apply for your <br />
            <span className="text-indigo-400 font-extrabold">next job listing</span>
          </h1>
          
          <p className="text-zinc-400 mt-5 text-sm md:text-base max-w-lg leading-relaxed">
            Discover thousands of career opportunities from world-class companies. Apply in just one click and jumpstart your career today.
          </p>

          {/* Search Box */}
          <div className="w-full max-w-xl mt-8 flex flex-col sm:flex-row items-center gap-2.5 bg-dark-card p-2 border border-dark-border rounded-2xl shadow-xl focus-within:border-indigo-500/30 transition-all">
            <div className="flex items-center w-full px-3 gap-2">
              <Search className="h-4.5 w-4.5 text-zinc-500 shrink-0" />
              <input
                type="text"
                placeholder="Job title, keywords, or skills..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
                className="w-full bg-transparent text-zinc-200 border-none outline-none focus:ring-0 text-sm py-2"
              />
            </div>
            <button
              onClick={searchJobHandler}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-indigo-600/10 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Search</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Category Carousel Section */}
      <CategoryCarousel />

      {/* Featured Jobs Section */}
      <LatestJobs />

      <Footer />
    </div>
  );
};

export default Home;
