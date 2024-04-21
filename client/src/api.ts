import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5174", // Replace with your backend server URL
});

export default api;
