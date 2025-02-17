import storageKeys from "@constants/storageKeys";
import { UnistylesRuntime, UnistylesThemes } from "react-native-unistyles";
import { setItem } from "src/services/apiService";

const changeTheme = (mode: keyof UnistylesThemes) => {
  setItem(storageKeys.DEFAULT_THEME, { myTheme: mode });
  UnistylesRuntime.setTheme(mode);
};
export default changeTheme;
