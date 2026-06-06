import React from "react";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  // Take the first 6 jobs to display
  const featuredJobs = allJobs?.slice(0, 6) || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center md:text-left mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Latest & Featured <span className="text-indigo-400">Job Openings</span>
        </h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Find your dream career with top companies hiring right now.
        </p>
      </div>

      {featuredJobs.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center text-gray-400 border border-dark-border/40">
          No jobs posted yet. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
