import axios, { AxiosRequestHeaders } from "axios";

const $api = axios.create({
  baseURL: "http://localhost:3004",
});

const $authHost = axios.create({
  baseURL: "http://localhost:3004",
});
console.log(localStorage.getItem('token'))
$authHost.interceptors.request.use((config) => {
  (
    config.headers as AxiosRequestHeaders
  ).Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
export { $api, $authHost };
