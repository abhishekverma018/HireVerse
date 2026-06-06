import React from "react";
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0b0c14] border-t border-dark-border mt-auto px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <Briefcase className="h-5.5 w-5.5 text-indigo-500" />
          <span className="text-lg font-bold text-white tracking-tight">
            HireVerse
          </span>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
          <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
          <Link to="/jobs" className="hover:text-violet-400 transition-colors">Browse Jobs</Link>
          <a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-violet-400 transition-colors">Terms of Service</a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 text-gray-400">
          <a href="#" className="hover:text-violet-400 p-2 border border-dark-border rounded-lg hover:border-violet-500/20 hover:bg-violet-600/5 transition-all">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="#" className="hover:text-violet-400 p-2 border border-dark-border rounded-lg hover:border-violet-500/20 hover:bg-violet-600/5 transition-all">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="#" className="hover:text-violet-400 p-2 border border-dark-border rounded-lg hover:border-violet-500/20 hover:bg-violet-600/5 transition-all">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-dark-border/40 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} HireVerse. All rights reserved. Built with React and Tailwind CSS v4.
      </div>
    </footer>
  );
};

export default Footer;
