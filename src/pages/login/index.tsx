import { Auth } from 'aws-amplify';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as yup from 'yup';
import Button from '../../components/Button';
import TextFieldComponent from '../../components/Textfield';
import Typography from '../../components/Typography';
import { runValidation } from '../../util/formValidation';
import Api from '../../util/api';
import { useRouter } from 'next/router';
import { setUserData } from '../../store/user';
import { setCompanyData } from '../../store/company';
import Hypertext from '../../components/Hypertext';
import { CompanyStatus, CompanyTypes } from '@fena/types';

import Profile from 'image/icon/profile.svg';
import Spinner from '../../components/Spinner';
import { useSignIn } from '../../constant/hooks/useSignIn';

const yupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email field is required'),
  password: yup.string().required('required').min(7, 'min'),
});

const LogInWrapper = styled.section`
  padding: 30px calc((100vw - 380px) / 2);
`;

const Form = styled.form`
  margin-top: 48px;
  width: 100%;
  @media (max-width: 900px) {
    margin-top: 1rem;
  }
`;

const WrapperTextField = styled.div`
  width: 100%;
  margin-top: 10px;
  &:first-child {
    margin-top: 0px;
  }
`;

const LogIn = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WrapperImageProfile = styled.div`
  display: flex;
  padding: 19px;
  background: #f4f7f9;
  border-radius: 50%;
  margin-bottom: 17px;
`;

const WrapperText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 57px;
  @media (max-width: 1400px) {
    margin-top: 30px;
  }
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginWithEmail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { checkSignInStatus } = useSignIn();
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState<any>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(null);

  const asyncCheck = async () => {
    await checkSignInStatus();
    setLoading(false);
  };

  useEffect(() => {
    asyncCheck();
  }, []);

  const _onChange = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const newUserInfo = { ...formData, [key]: event.target.value };
    setFormData(newUserInfo);
    runValidation(yupSchema, newUserInfo).then((err) => {
      setFormErrors(err);
    });
  };

  const signIn = async (event: MouseEvent<any>) => {
    event.preventDefault();
    try {
      const { email, password } = formData;

      if (Object.keys(formErrors).length === 0) {
        await Auth.signIn(email, password);
        const session = await Auth.currentSession();
        const accessToken = session.getAccessToken();
        const jwt = accessToken.getJwtToken();
        Api.updateHeadersWithToken(jwt);
        const user = await Api.getUser();
        dispatch(
          setUserData({
            cognitoReferenceId: accessToken.payload.sub,
            firstName: user.firstName,
            lastName: user.lastName,
            company: user.company,
            email: user.email,
            id: user._id,
            token: accessToken.getJwtToken(),
            role: user.role,
            status: user.status,
            phoneNumber: user.phoneNumber,
            job: user.job,
            loggedIn: true,
            emailVerified: user.emailVerified,
            emailChasersStatus: user.emailChasersStatus,
          })
        );
        const companyData = await Api.getCompany();
        console.log('companyData', companyData);
        dispatch(
          setCompanyData({
            ...companyData,
          })
        );
        if (!user.phoneNumber) {
          await router.push({
            pathname: '/register/additional',
          });
          return;
        }
        if (!user.company) {
          await router.push({
            pathname: '/register/business/',
          });
          return;
        }
        if (
          companyData.type === CompanyTypes.COMPANY &&
          !companyData.tradingName
        ) {
          await router.push({
            pathname: '/register/business/limited',
          });
          return;
        }
        if (companyData.status === CompanyStatus.BANNED) {
          await router.push({ pathname: '/login/suspended' });
          setLoading(false);
          return;
        }
      }
      router.push('/dashboard/payment/invoice');
    } catch (error: any) {
      setLoginError(error);
      console.error(error);
    }
  };

  if (loading)
    return (
      <SpinnerContainer>
        <Spinner width={50} height={50} />
      </SpinnerContainer>
    );

  return (
    <LogInWrapper>
      <LogIn>
        <WrapperImageProfile>
          <Profile />
        </WrapperImageProfile>
        <Typography variant="subtitle4">Log In</Typography>
        <Form>
          {loginError && (
            <Typography
              variant="body2"
              color="#EF6355"
              style={{
                textAlign: 'center',
              }}
            >
              Email/Password combination is incorrect
            </Typography>
          )}
          <WrapperTextField>
            <TextFieldComponent
              fullWidth
              label="Email"
              inputProps={{
                required: true,
                placeholder: 'example@gmail.com',
                value: formData.email,
                type: 'email',
                onChange: _onChange('email'),
              }}
              error={formErrors?.email && formErrors?.email[0]}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              fullWidth
              label="Password"
              inputProps={{
                placeholder: 'At least 8 characters',
                value: formData.password,
                type: 'password',
                required: true,
                onChange: _onChange('password'),
              }}
              icon={() => {
                if (formErrors?.password) {
                  return <img alt="" src="/image/icon/error.svg" />;
                } else if (formData.password) {
                  return <img alt="" src="/image/icon/success-nooutline.svg" />;
                } else {
                  return <></>;
                }
              }}
              borderColor={!formErrors?.password && 'success'}
            />
          </WrapperTextField>
          <Button
            variant="contained"
            fullWidth
            style={{ marginTop: '32px' }}
            onClick={signIn}
          >
            Sign in
          </Button>
          <WrapperText>
            <Typography variant="body4">
              Don&apos;t have an account?{' '}
            </Typography>
            <Hypertext
              onClick={() => router.push('/register')}
              style={{ marginLeft: '3px' }}
            >
              Sign up
            </Hypertext>
          </WrapperText>
          <WrapperText>
            <Typography variant="body4">Forgotten your password? </Typography>
            <Hypertext
              onClick={async () => {
                //TODO page for forgot psw with input 'email'
                router.push('/restore');
              }}
              style={{ marginLeft: '3px' }}
            >
              Reset
            </Hypertext>
          </WrapperText>
        </Form>
      </LogIn>
    </LogInWrapper>
  );
};

export default LoginWithEmail;
