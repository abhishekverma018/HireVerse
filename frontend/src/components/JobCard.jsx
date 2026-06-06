import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, DollarSign, Calendar } from "lucide-react";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  // Helper to format date
  const timeAgo = (createdAt) => {
    const postDate = new Date(createdAt);
    const today = new Date();
    const diffTime = Math.abs(today - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    return `${diffDays} days ago`;
  };

  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="glass-card flex flex-col justify-between p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg animate-fade-in-up"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-400 flex items-center gap-1 font-medium bg-[#1e2238]/30 px-2.5 py-1 rounded-full border border-dark-border/40">
            <Calendar className="h-3 w-3" />
            {job?.createdAt ? timeAgo(job?.createdAt) : "Recently"}
          </span>
          <span className="text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-full">
            {job?.position} Positions
          </span>
        </div>

        {/* Company Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 bg-violet-600/10 border border-violet-500/20 rounded-xl flex items-center justify-center font-bold text-violet-400 text-lg">
            {job?.company?.name?.charAt(0).toUpperCase() || "J"}
          </div>
          <div>
            <h4 className="text-gray-200 font-semibold truncate max-w-[180px]">{job?.company?.name || "Company Name"}</h4>
            <p className="text-gray-400 text-xs flex items-center gap-0.5">
              <MapPin className="h-3.5 w-3.5 text-gray-500" />
              {job?.location}
            </p>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{job?.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Badges & Footer */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-dark-border/40 mt-auto">
        <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/10">
          {job?.jobType}
        </span>
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/10 flex items-center">
          <DollarSign className="h-3 w-3" /> {job?.salary} LPA
        </span>
        <span className="text-xs font-semibold text-pink-400 bg-pink-500/10 px-3 py-1.5 rounded-full border border-pink-500/10">
          {job?.experienceLevel} Yrs Exp
        </span>
      </div>
    </div>
  );
};

export default JobCard;
