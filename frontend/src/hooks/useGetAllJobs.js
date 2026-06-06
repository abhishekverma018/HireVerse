import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";
import { JOB_API_END_POINT } from "../utils/constant";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchKeyword } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const query = searchKeyword ? `?keyword=${searchKeyword}` : "";
        const res = await axios.get(`${JOB_API_END_POINT}/get${query}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Fetch all jobs error:", error);
      }
    };
    fetchAllJobs();
  }, [searchKeyword, dispatch]);
};

export default useGetAllJobs;
