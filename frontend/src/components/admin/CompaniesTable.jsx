import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, ExternalLink } from "lucide-react";

const CompaniesTable = () => {
  const { companies, searchCompanyText } = useSelector((store) => store.company);
  const [filterCompanies, setFilterCompanies] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter((company) => {
      if (!searchCompanyText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyText.toLowerCase());
    });
    setFilterCompanies(filtered);
  }, [companies, searchCompanyText]);

  return (
    <div className="w-full bg-[#121420]/80 border border-dark-border rounded-2xl overflow-hidden animate-fade-in-up">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-dark-border">
          <thead className="bg-[#121420]">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Logo</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Company Name</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Registered Date</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border/40 bg-[#121420]/20">
            {filterCompanies.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                  No companies registered yet.
                </td>
              </tr>
            ) : (
              filterCompanies.map((company) => (
                <tr key={company._id} className="hover:bg-violet-600/5 transition-all">
                  {/* Logo */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 bg-violet-600/10 border border-violet-500/20 rounded-xl flex items-center justify-center font-bold text-violet-400 text-base">
                      {company.logo ? (
                        <img src={company.logo} alt="logo" className="h-full w-full object-cover rounded-xl" />
                      ) : (
                        company.name?.charAt(0).toUpperCase()
                      )}
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-white">{company.name}</div>
                    {company.website && (
                      <a
                        href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-0.5 mt-0.5"
                      >
                        {company.website}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {company.location || "N/A"}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(company.createdAt).toLocaleDateString()}
                  </td>

                  {/* Edit */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="inline-flex items-center space-x-1 bg-violet-600/10 border border-violet-500/20 hover:border-violet-500 hover:bg-violet-600 text-violet-400 hover:text-white px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompaniesTable;
