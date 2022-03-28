import axios, { AxiosInstance } from "axios";

class BaseService {
  constructor() {}
  http: AxiosInstance = axios.create({
    baseURL: "https://dev.micontrato.co/v1",
    headers: {
      "Content-Type": "application/json",
      Authorization: "puk_ocG0ODMlBlAN4NOi4GxVJjmC7oO6SsNI",
    },
  });
}
export default BaseService;
