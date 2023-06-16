import jwt_decode from "jwt-decode";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwt_decode(token);

      if (decoded.exp < Date.now() / 1000) {
        console.log("expired");
        const res = await axiosInstance.post("/auth/refresh", {
          refreshToken: localStorage.getItem("refreshToken"),
        });
        if (res.data) {
          console.log(res.data);
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          token = res.data.accessToken;

          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("name");
          localStorage.removeItem("role");
          window.location.href = "/auth";
        }
      }

      config.headers["Authorization"] = `Bearer ${token}`;
      return {
        ...config,
      };
    } else {
      return {
        ...config,
      };
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
