import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchKeyword } from "../redux/jobSlice";
import { Code, Database, Palette, Smartphone, Globe, BarChart } from "lucide-react";

const categories = [
  { name: "Frontend Developer", icon: <Globe className="h-5 w-5 text-blue-400" /> },
  { name: "Backend Developer", icon: <Database className="h-5 w-5 text-emerald-400" /> },
  { name: "Data Science", icon: <BarChart className="h-5 w-5 text-indigo-400" /> },
  { name: "Graphic Designer", icon: <Palette className="h-5 w-5 text-pink-400" /> },
  { name: "Fullstack Developer", icon: <Code className="h-5 w-5 text-violet-400" /> },
  { name: "Mobile Developer", icon: <Smartphone className="h-5 w-5 text-amber-400" /> },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (categoryName) => {
    dispatch(setSearchKeyword(categoryName));
    navigate("/jobs");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-widest">Browse by Category</h3>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => searchJobHandler(cat.name)}
            className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-dark-card border border-dark-border hover:border-violet-500/30 hover:bg-violet-600/5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-gray-300 font-medium hover:text-white"
          >
            {cat.icon}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
