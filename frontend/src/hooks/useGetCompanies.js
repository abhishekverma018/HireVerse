import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCompanies } from "../redux/companySlice";
import { COMPANY_API_END_POINT } from "../utils/constant";

const useGetCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error("Fetch companies error:", error);
      }
    };
    fetchCompanies();
  }, [dispatch]);
};

export default useGetCompanies;
