import CustomButton from '@components/atoms/ButtonContainer';
import {CustomTextInput} from '@components/molecules';
import RememberMe from '@components/molecules/RememberMe';
import imagePath from '@constants/imagePath';
import {useDispatch, useSelector} from '@redux/hooks';
import {alertFunction} from '@utils/index';
import {verticalScale} from '@utils/scaling';
import validationForm from '@utils/validationForm';
import {Formik} from 'formik';
import React, {createRef, Fragment, useCallback, useRef, useState} from 'react';
import {Keyboard, TextInput} from 'react-native';
import {signup} from 'src/services/authService';

// Form field reference declaration
const inputRef = {
  email: createRef<TextInput>(),
  password: createRef<TextInput>(),
};

const SignupForm = (): React.JSX.Element => {
  // Redux variables
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.common.isLoading);

  // Reference Variableș
  const signupFormRef = useRef(null);

  // Local state declaration
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Signup button callback
  const onSignup = useCallback(
    async ({name, email, password}: {name: string; email: string; password: string}) => {
      console.log(name, email, password);
      dispatch(signup({name, email, password}));
    },
    [],
  );

  return (
    <Formik
      innerRef={signupFormRef}
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={validationForm.signup}
      onSubmit={onSignup}>
      {({...params}) => {
        return (
          <Fragment>
            <CustomTextInput
              value={params.values.name}
              leftImage={imagePath.icUser}
              label="NAME"
              id="name"
              placeholder="ENTER_YOUR_NAME"
              returnKeyType="next"
              style={{marginBottom: verticalScale(24)}}
              error={params.touched.name ? params.errors.name : null}
              onChangeText={params.handleChange('name')}
              onBlur={params.handleBlur('name')}
              onSubmitEditing={() => inputRef.email.current?.focus()}
            />
            <CustomTextInput
              value={params.values.email}
              ref={inputRef.email}
              leftImage={imagePath.icEmail}
              label="EMAIL"
              id="email"
              placeholder="ENTER_YOUR_EMAIL"
              returnKeyType="next"
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginBottom: verticalScale(24)}}
              error={params.touched.email ? params.errors.email : null}
              keyboardType="email-address"
              onChangeText={params.handleChange('email')}
              onBlur={params.handleBlur('email')}
              onSubmitEditing={() => inputRef.password.current?.focus()}
            />
            <CustomTextInput
              value={params.values.password}
              ref={inputRef.password}
              leftImage={imagePath.icLock}
              rightImage={secureTextEntry ? imagePath.icPassword : imagePath.icPasswordShow}
              label="PASSWORD"
              id="password"
              placeholder="ENTER_YOUR_PASSWORD"
              returnKeyType="done"
              style={{marginBottom: verticalScale(24)}}
              error={params.touched.password ? params.errors.password : null}
              secureTextEntry={secureTextEntry}
              onChangeText={params.handleChange('password')}
              onBlur={params.handleBlur('password')}
              onPressRight={() => setSecureTextEntry(!secureTextEntry)}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            <RememberMe onPressForgot={() => alertFunction('Password', 'Forgot Password')} />
            <CustomButton
              isLoading={isLoading}
              label="SIGNUP"
              onPress={() => params.handleSubmit()}
            />
          </Fragment>
        );
      }}
    </Formik>
  );
};

export default SignupForm;
