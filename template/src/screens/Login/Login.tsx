import {WrapperContainer} from '@components/atoms';
import {AuthHeader, FooterView} from '@components/molecules';
import React from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import LoginForm from './components/LoginForm';
import useLogin from './hooks/useLogin';
import stylesheet from './styles';

const Login = (): React.JSX.Element => {
  // Login hidden action and effect implementation from the screen
  const {onSignupPress} = useLogin();

  // Stylesheet declaration
  const {styles} = useStyles(stylesheet);

  return (
    <WrapperContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <AuthHeader
              title="LOG_IN_TO_YOUR_ACCOUNT"
              description="WELCOME_BACK_PLEASE_ENTER_YOUR_DETAILS"
            />
            <LoginForm />
          </View>
          <FooterView simpleText="DONT_HAVE_ACCOUNT" linkText="SIGNUP" linkPress={onSignupPress} />
        </View>
      </TouchableWithoutFeedback>
    </WrapperContainer>
  );
};

export default Login;
