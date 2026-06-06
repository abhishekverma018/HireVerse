import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterQueries, resetFilters } from "../redux/jobSlice";
import { RotateCcw, MapPin, Briefcase as BriefcaseIcon, DollarSign } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    key: "location",
    icon: <MapPin className="h-4 w-4 text-violet-400" />,
    array: ["Delhi NCR", "Bangalore", "Pune", "Hyderabad", "Mumbai"],
  },
  {
    filterType: "Job Type",
    key: "jobType",
    icon: <BriefcaseIcon className="h-4 w-4 text-pink-400" />,
    array: ["Full-time", "Part-time", "Contract", "Internship"],
  },
  {
    filterType: "Salary Range (LPA)",
    key: "salary",
    icon: <DollarSign className="h-4 w-4 text-emerald-400" />,
    array: ["0-3", "3-6", "6-10", "10-15", "15+"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const { filterQueries } = useSelector((store) => store.job);

  const changeHandler = (key, value) => {
    dispatch(setFilterQueries({ [key]: value }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="w-full bg-[#121420]/80 border border-dark-border rounded-2xl p-6 h-fit sticky top-24">
      <div className="flex items-center justify-between pb-4 border-b border-dark-border/60">
        <h2 className="text-xl font-bold text-white">Filter Jobs</h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-violet-400 hover:bg-violet-500/10 px-2.5 py-1.5 rounded-lg border border-dark-border hover:border-violet-500/20 transition-all cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      <div className="space-y-6 mt-6">
        {filterData.map((data, index) => (
          <div key={index} className="space-y-3">
            <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2">
              {data.icon}
              {data.filterType}
            </h3>
            <div className="flex flex-col gap-2.5">
              {data.array.map((item, idx) => {
                const isChecked = filterQueries[data.key] === item;
                const itemId = `filter-${data.key}-${idx}`;
                return (
                  <div key={idx} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      id={itemId}
                      name={data.key}
                      checked={isChecked}
                      onChange={() => changeHandler(data.key, item)}
                      className="h-4.5 w-4.5 rounded-full border-2 border-gray-600 bg-transparent text-violet-600 focus:ring-violet-500 cursor-pointer accent-violet-500 transition-colors"
                    />
                    <label
                      htmlFor={itemId}
                      className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors cursor-pointer select-none"
                    >
                      {item} {data.key === "salary" && item !== "15+" ? "LPA" : ""}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
