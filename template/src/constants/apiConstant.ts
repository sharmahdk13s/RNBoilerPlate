import {BASE_API_URL} from "@env";

export const BASE_URL = BASE_API_URL;

const API_CONSTANT = {
  login: "auth/login",
  register: "users/add",
  product: "/products",
  refreshToken: "auth/refreshToken",
};

export default API_CONSTANT;