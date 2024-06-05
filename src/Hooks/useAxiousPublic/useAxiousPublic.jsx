import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://server-job-nu.vercel.app",
  baseURL: "http://localhost:5015",
  withCredentials: true,
});
const useAxiousPublic = () => {
  return axiosPublic;
};

export default useAxiousPublic;
