/* eslint-disable */
import API_CONSTANT, { BASE_URL } from "@constants/apiConstant";
import storageKeys from "@constants/storageKeys";
import type { ExtendedApiErrorResponse } from "@models/ApiErrorResponse";
import type { User } from "@models/User";
import type { LocalStorage } from "@typings/global";
import axios from "axios";
import { MMKV } from "react-native-mmkv";
import { refreshToken } from "./authService";
import { isTokenExpired } from "@utils/index";

export const storage = new MMKV();

interface PostOptions {
  cancelToken?: any; // Adjust the type as per your requirements
}

const api = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'Application/json',
  },
  timeout: 10000 // Set a timeout for requests (in milliseconds)
});

const handleApiError = (error: ExtendedApiErrorResponse) => {
  console.log("here error", error);
  if (error.response) {
    switch (error.axiosError?.status) {
      case 401: {
        // handle your unauthorized error here
        return { ...error.response, error: error.message };
      }
      default: {
        if (!error) {
            return { error: "Unknown error" };
        }
    
        if (error.response && error.response.data.error && !error.message) {
            return {
                ...error.response,
                error: error.response.data.error || "Network Error"
            };
        }
    
        if (error.response && error.response.data) {
            return error.response.data;
        }
    
        return { error: `${error.message}` };
    }
    }
  }
  return { error: error.message }
}

// Axios interceptor to add Authorization header before each request
api.interceptors.request.use(async config => {
  // Add the Authorization header if a token is present
  const userData = getItem(storageKeys.USER_DATA);
  var token = userData?.accessToken;
  if (userData) {
      let isExpired = isTokenExpired(token || null);
      console.log("isExpired.....", isExpired);
      if (
        isExpired &&
        !config.url?.includes(API_CONSTANT.refreshToken)
      ) {
        await refreshToken();
        token = getItem(storageKeys.USER_DATA)?.accessToken || '';
      }
      if(token){
        config.headers.Authorization = `Bearer ${token}`;
      }else{
        throw new Error("Authorization failed");
      }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const get = async (endpoint: string, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

export const post = async (
  endpoint: string,
  data = {},
  options?: PostOptions
) => {
  try {
    const response = await api.post(endpoint, data, options);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

export const put = async (endpoint: string, data = {}, options?: PostOptions) => {
  try {
    const response = await api.put(endpoint, data, options);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

export const remove = async (endpoint: string) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

export const setItem = (key: LocalStorage, value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const getItem = (key: LocalStorage): User | null  => {
  const jsonUser = storage.getString(key);
  if (jsonUser) {
    try {
      const userObject: User = JSON.parse(jsonUser);
      return userObject;
    } catch (error) {
      console.log("Error parsing user data:", error);
      return null;
    }
  } else {
    console.log("No data found for the key:", key);
    return null;
  }
};

export const clearAllItem = () => storage.clearAll();
