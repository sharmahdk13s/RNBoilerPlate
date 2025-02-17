import API_CONSTANT from "@constants/apiConstant";
import storageKeys from "@constants/storageKeys";
import { hasError, saveUserData } from "@redux/reducers/auth";
import { setLoading } from "@redux/reducers/common";
import store, { AppDispatch } from "@redux/store";
import { getItem, post, setItem } from "./apiService";

// Login authentication API
const login = (authCred: {username: string, password: string}) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await post(API_CONSTANT.login, authCred);
    if (response) {
        dispatch(saveUserData(response));
        setItem(storageKeys.USER_DATA, response);
    } else {
      console.info(response.data.message);
      dispatch(hasError(new Error(response.data.message)));
    }
  } catch (error) {
    console.error(error);
    dispatch(hasError(error as Error));
  } finally {
    dispatch(setLoading(false));
  }
};


// Signup authentication API
const signup = (details: {name: string, email: string, password: string}) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await post(API_CONSTANT.register, details);
    if (response.status == 200) {
      if (response.success) {
        dispatch(saveUserData(response));
      } else {
        console.info(response.message);
        dispatch(hasError(new Error(response?.message)));
      }
    } else {
      console.info(response?.message);
      dispatch(hasError(new Error(response?.message)));
    }
  } catch (error) {
    console.error(error);
    dispatch(hasError(error as Error));
  } finally {
    dispatch(setLoading(false));
  }
};


// Refresh Token API
const refreshToken = async () => {
  const dispatch = store.dispatch;
  try {
    const userData = getItem(storageKeys.USER_DATA);
    let currentRefreshToken = userData?.refreshToken;
    dispatch(setLoading(true));
    const response = await post(API_CONSTANT.refreshToken, {
      refreshToken: currentRefreshToken,
    });
      if (response.success) {
        setItem(storageKeys.USER_DATA, response);
        dispatch(saveUserData(response));
    } else {
      dispatch(hasError(response.message));
    }
  } catch (error) {
    dispatch(hasError(error as Error));
  } finally {
    dispatch(setLoading(false));
  }
};

export { login, signup, refreshToken };
