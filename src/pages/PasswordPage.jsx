import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { authOperations } from 'redux/auth';
// import { useAuth } from 'hooks';
import {
  emailSendSchema,
  passwordSchema,
} from 'validationSchemas/passwordSchema';

import { Input, PrimaryButton } from 'components';

import { Background, Container } from './styles/commonStyles';
import { PasswordContainer, Title } from './styles/passwordPage';

const initialValues = {
  email: '',
  password: '',
  verifyPassword: '',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const PasswordPage = () => {
  const [passwordToken, setPasswordToken] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const param = searchParams.get('token');
    // const rng = Math.floor(Math.random() * 11);
    // setPasswordToken(rng <= 5 ? false : true);

    if (param) {
      setPasswordToken(true);
      authOperations.token.set(param);
      console.log(param);
      console.log(authOperations.token);

      return;
    }

    setPasswordToken(false);
    console.log(param);
  }, [searchParams]);

  const onHandleSubmit = async (
    { email, password, verifyPassword },
    { resetForm }
  ) => {
    try {
      if (email !== '') {
        console.log(email);
        dispatch(authOperations.recoverPassword({ email }));
      }

      if (password !== verifyPassword) {
        alert('Password do not match');

        return;
      }

      if (password !== '' && verifyPassword !== '') {
        dispatch(authOperations.recInPassword({ passwordNew: password }));
      }

      resetForm();
    } catch (error) {
      //  if (error.response && error.response.status === 409) {
      //     console.error('User already exists:', error.message);
      //     // Handle the 409 error (user already exists) here
      //    } else {
      //     console.error('An error occurred:', error.message);
      //     // Handle other errors here
      //   }
    }
  };
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: initialValues,
      onSubmit: onHandleSubmit,
      validationSchema: !passwordToken ? emailSendSchema : passwordSchema,
    });

  return (
    <Background>
      <Container>
        <PasswordContainer>
          <form style={formStyle} onSubmit={handleSubmit}>
            <Title>
              {!passwordToken ? 'Password recovery' : 'Change your password'}
            </Title>
            {!passwordToken ? (
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            ) : null}
            {!passwordToken && errors.email && touched.email ? (
              <span style={{ color: 'white' }}>{errors.email}</span>
            ) : null}

            {passwordToken ? (
              <Input
                name="password"
                type="password"
                placeholder="Enter your new password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            ) : null}
            {passwordToken && errors.password && touched.password ? (
              <span style={{ color: 'white' }}>{errors.password}</span>
            ) : null}

            {passwordToken ? (
              <Input
                name="verifyPassword"
                type="password"
                placeholder="Confirm your password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.verifyPassword}
              />
            ) : null}
            {passwordToken &&
            errors.verifyPassword &&
            touched.verifyPassword ? (
              <span style={{ color: 'white' }}>{errors.verifyPassword}</span>
            ) : null}

            <PrimaryButton
              style={{ marginTop: '14px' }}
              hasIcon={false}
              type="submit"
            >
              {!passwordToken ? 'Send email' : 'Change your password'}
            </PrimaryButton>
          </form>
        </PasswordContainer>
      </Container>
    </Background>
  );
};

export default PasswordPage;
