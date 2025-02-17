import { AuthStackParamList } from '@navigations/AuthStack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from '@redux/hooks';
import { hasError } from '@redux/reducers/auth';
import { alertFunction } from '@utils/index';
import { useCallback, useEffect } from 'react';
import { Platform, ToastAndroid } from 'react-native';

// Custom Login hook
const useLogin = () => {
//Navigation variable declaration
const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

// Redux variables
const dispatch = useDispatch();
const error = useSelector(state => state.auth.error);

const onSignupPress = useCallback(() => {
    navigation.navigate('Signup');
}, []);

// Effects
    useEffect(() => {
    if (error?.message) {
        if (Platform.OS === 'android') {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        } else {
        alertFunction(error.message, '');
        }
        dispatch(hasError(new Error('')));
    }
    }, [error]);

    return {onSignupPress};
};

export default useLogin;