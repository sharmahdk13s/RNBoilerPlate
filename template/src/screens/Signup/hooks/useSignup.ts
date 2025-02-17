import type { AuthStackParamList } from '@navigations/AuthStack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from '@redux/hooks';
import { hasError } from '@redux/reducers/auth';
import { alertFunction } from '@utils/index';
import { useCallback, useEffect } from 'react';
import { Platform, ToastAndroid } from 'react-native';

// Custom Signup hook
const useSignup = () => {
    // Navigation variable declaration
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    
    // Redux variables
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);

    const onGoBack = useCallback(() => {
        navigation.goBack();
    }, []);
  
    // Effects
    useEffect(() => {
      if (error?.message) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        } else {
          alertFunction(error.message, '', false, onGoBack);
        }
        dispatch(hasError(new Error('')));
      }
    }, [error]);
  
    return {onGoBack};
};

export default useSignup;