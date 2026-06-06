import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterCard from "../components/FilterCard";
import JobCard from "../components/JobCard";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, filterQueries } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    let tempJobs = [...allJobs];

    // Filter by location
    if (filterQueries.location) {
      tempJobs = tempJobs.filter((job) =>
        job.location?.toLowerCase().includes(filterQueries.location.toLowerCase())
      );
    }

    // Filter by job type
    if (filterQueries.jobType) {
      tempJobs = tempJobs.filter((job) =>
        job.jobType?.toLowerCase().includes(filterQueries.jobType.toLowerCase())
      );
    }

    // Filter by salary range
    if (filterQueries.salary) {
      const range = filterQueries.salary; // "0-3", "3-6", "6-10", "10-15", "15+"
      tempJobs = tempJobs.filter((job) => {
        const sal = Number(job.salary);
        if (isNaN(sal)) return true;
        if (range === "0-3") return sal >= 0 && sal <= 3;
        if (range === "3-6") return sal > 3 && sal <= 6;
        if (range === "6-10") return sal > 6 && sal <= 10;
        if (range === "10-15") return sal > 10 && sal <= 15;
        if (range === "15+") return sal > 15;
        return true;
      });
    }

    setFilterJobs(tempJobs);
  }, [allJobs, filterQueries]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filter Sidebar */}
          <div className="w-full lg:w-1/4">
            <FilterCard />
          </div>
          
          {/* Job Feed */}
          <div className="w-full lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">
                Available Jobs ({filterJobs.length})
              </h1>
              <p className="text-xs text-gray-400">
                Showing matching positions
              </p>
            </div>

            {filterJobs.length === 0 ? (
              <div className="glass-card rounded-2xl p-16 text-center text-gray-400 border border-dark-border/40">
                No jobs match your selected filters. Try adjusting them!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
