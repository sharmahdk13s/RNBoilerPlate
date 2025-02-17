import {ButtonContainer} from '@components/atoms';
import {CustomTextInput, RememberMe} from '@components/molecules';
import imagePath from '@constants/imagePath';
import {useDispatch, useSelector} from '@redux/hooks';
import {alertFunction} from '@utils/index';
import {verticalScale} from '@utils/scaling';
import validationForm from '@utils/validationForm';
import {Formik} from 'formik';
import React, {Fragment, useCallback, useRef, useState} from 'react';
import {Keyboard, TextInput} from 'react-native';
import {login} from 'src/services/authService';

const LoginForm = (): React.JSX.Element => {
  // Reference variables
  const loginFormRef = useRef(null);
  const passwordInputRef = useRef<TextInput>(null);

  // Redux variables
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.common.isLoading);

  // Local state declaration
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Login button callback
  const onLogin = useCallback(({username, password}: {username: string; password: string}) => {
    dispatch(login({username, password}));
  }, []);

  return (
    <Formik
      innerRef={loginFormRef}
      initialValues={{
        username: 'emilys',
        password: 'emilyspass',
      }}
      validationSchema={validationForm.login}
      onSubmit={onLogin}>
      {({...params}) => {
        return (
          <Fragment>
            <CustomTextInput
              value={params.values.username}
              leftImage={imagePath.icUser}
              label="USERNAME"
              id="username"
              placeholder="ENTER_YOUR_USERNAME"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              style={{marginBottom: verticalScale(16)}}
              error={params.touched.username ? params.errors.username : null}
              onChangeText={params.handleChange('username')}
              onBlur={params.handleBlur('username')}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <CustomTextInput
              ref={passwordInputRef}
              value={params.values.password}
              leftImage={imagePath.icLock}
              rightImage={secureTextEntry ? imagePath.icPassword : imagePath.icPasswordShow}
              label="PASSWORD"
              id="password"
              placeholder="ENTER_YOUR_PASSWORD"
              returnKeyType="done"
              secureTextEntry={secureTextEntry}
              style={{marginBottom: verticalScale(30)}}
              error={params.touched.password ? params.errors.password : null}
              onChangeText={params.handleChange('password')}
              onBlur={params.handleBlur('password')}
              onPressRight={() => setSecureTextEntry(!secureTextEntry)}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            <RememberMe onPressForgot={() => alertFunction('Password', 'Forgot Password')} />
            <ButtonContainer
              isLoading={isLoading}
              label="LOG_IN"
              onPress={() => params.handleSubmit()}
            />
          </Fragment>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
