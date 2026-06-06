import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import { JOB_API_END_POINT } from "../utils/constant";

const useGetSingleJob = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      if (!jobId) return;
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error("Fetch single job error:", error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);
};

export default useGetSingleJob;
