import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ChevronLeft, Users, Loader2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ApplicantsTable from "../../components/admin/ApplicantsTable";
import { setApplicants } from "../../redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

const Applicants = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/${jobId}/applicants`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setApplicants(res.data.job));
      }
    } catch (error) {
      console.error("Fetch applicants error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full">
        {/* Back Link */}
        <Link to="/admin/jobs" className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-violet-400 gap-1 mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Back to Jobs
        </Link>

        {loading ? (
          <div className="glass-card rounded-2xl p-16 text-center text-gray-400 border border-dark-border/40">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-violet-500 mb-4" />
            Loading applicants list...
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-2xl">
                  <Users className="h-6 w-6 text-violet-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-white">
                    Applicants for {applicants?.title || "Job"}
                  </h1>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Review candidate qualifications and update application statuses.
                  </p>
                </div>
              </div>
            </div>

            {/* Applicants Table */}
            <ApplicantsTable onStatusUpdate={fetchApplicants} />

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Applicants;
