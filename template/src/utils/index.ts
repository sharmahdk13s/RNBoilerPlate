import { Alert } from "react-native";

export const alertFunction = (title: string, message: string, showCancel: boolean = false, onOkPress: () => void = () => {}, onCancelPress: () => void = () => {}) => {
let alertOptions: { text: string; onPress: () => void; style?: 'cancel' | 'default' | 'destructive' }[] = [{text: 'OK', onPress: onOkPress}];
if(showCancel){
    alertOptions.unshift({
        text: 'Cancel',
        onPress: onCancelPress,
        style: 'cancel',
      });
    }
  Alert.alert(
    title,
    message,
    alertOptions,
    {cancelable: !showCancel},
  );
};


const customAtob = (base64: string) => {
  const base64Chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let result = "";
  let buffer = 0,
    bits = 0,
    pad = 0;

  for (let i = 0; i < base64.length; i++) {
    const char = base64[i];

    if (char === "=") {
      pad++;
      continue;
    }

    const index = base64Chars.indexOf(char);

    if (index === -1) {
      throw new Error("Invalid base64 character");
    }

    buffer = (buffer << 6) | index;
    bits += 6;

    if (bits >= 8) {
      bits -= 8;
      const byte = (buffer >> bits) & 0xff;
      result += String.fromCharCode(byte);
    }
  }

  if (pad > 2) {
    throw new Error("Invalid padding in base64 string");
  }

  return result;
}

export const isTokenExpired = (token: string | null) => {
  if (!token) {
    throw new Error("Token is null or undefined");
  }
  const expiry = JSON.parse(customAtob(token.split(".")[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
};
