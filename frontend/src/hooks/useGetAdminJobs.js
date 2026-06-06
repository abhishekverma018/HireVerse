import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAdminJobs } from "../redux/jobSlice";
import { JOB_API_END_POINT } from "../utils/constant";

const useGetAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Fetch admin jobs error:", error);
      }
    };
    fetchAdminJobs();
  }, [dispatch]);
};

export default useGetAdminJobs;
