import {WrapperContainer} from '@components/atoms';
import AuthHeader from '@components/molecules/AuthHeader';
import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useStyles} from 'react-native-unistyles';
import SignupForm from './components/SignupForm';
import useSignup from './hooks/useSignup';
import stylesheet from './styles';
import {FooterView} from '@components/molecules';

function Signup(): React.JSX.Element {
  // Signup hidden action and effect implementation from the screen
  const {onGoBack} = useSignup();

  // Stylesheet declaration
  const {styles} = useStyles(stylesheet);

  return (
    <WrapperContainer>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <AuthHeader title="CREATE_AN_ACCOUNT" description="WELCOME_PLEASE_ENTER_YOUR_DETAILS" />
          <SignupForm />
        </View>
      </KeyboardAwareScrollView>
      <FooterView simpleText="ALREADY_HAVE_ACCOUNT" linkText="LOGIN" linkPress={onGoBack} />
    </WrapperContainer>
  );
}

export default Signup;
