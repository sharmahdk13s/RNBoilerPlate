import * as Yup from 'yup';

const usernameRegEx : RegExp = /^[0-9A-Za-z]{6,16}$/
const passwordRegEx : RegExp = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{6,32}$/

const validationForm = {
login: Yup.object({
  username: Yup.string()
    .required('USERNAME_EMPTY').matches(usernameRegEx, 'INVALID_USERNAME')
    .trim(),
    password: Yup.string().required('PASSWORD_EMPTY').trim(),
  }),
  signup: Yup.object({
    name: Yup.string().required('NAME_EMPTY'),
    email: Yup.string()
    .required('EMAIL_EMPTY')
    .email('VALID_EMAIL')
    .trim(),
    password: Yup.string().required('PASSWORD_EMPTY').matches(passwordRegEx, 'INVALID_PASSWORD').trim(),
  }),
};

export default validationForm;