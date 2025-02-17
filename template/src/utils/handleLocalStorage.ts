import storageKeys from "@constants/storageKeys";
import { saveUserData } from "@redux/reducers/auth";
import { saveDefaultLanguage, saveDefaultTheme } from "@redux/reducers/settings";
import store from "@redux/store";
import i18n from "i18next";
import { UnistylesRuntime } from "react-native-unistyles";
import { getItem } from "src/services/apiService";

const { dispatch } = store;
const checkLocalStorage = () => {
  // get user Data
  const userData = getItem(storageKeys.USER_DATA);
  if (userData) {
    dispatch(saveUserData(userData));
  }
  // get default theme
  const defaultTheme = getItem(storageKeys.DEFAULT_THEME);
  if (defaultTheme) {
    // @ts-expect-error : will handle later
    UnistylesRuntime.setTheme(defaultTheme.myTheme);
    // @ts-expect-error : will handle later
    dispatch(saveDefaultTheme(defaultTheme));
  }
  // get default language
  const defaultLanguage = getItem(storageKeys.DEFAULT_LANGUAGE);
  if (defaultLanguage) {
    // @ts-expect-error : will handle later
    i18n.changeLanguage(defaultLanguage.sortName);
    // @ts-expect-error : will handle later
    dispatch(saveDefaultLanguage(defaultLanguage));
  }
};

export default checkLocalStorage;
