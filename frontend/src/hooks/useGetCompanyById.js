import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";
import { COMPANY_API_END_POINT } from "../utils/constant";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!companyId) return;
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.error("Fetch company by id error:", error);
      }
    };
    fetchCompanyDetails();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
