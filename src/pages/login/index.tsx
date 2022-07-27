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
import Profile from 'image/icon/profile.svg';
import Spinner from '../../components/Spinner';
import { useSignIn } from '../../constant/hooks/useSignIn';
import { NotAuthorizedException } from '@aws-sdk/client-cognito-identity';

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
  const [loginError, setLoginError] = useState<string | null>(null);

  const asyncCheck = async () => {
    // await checkSignInStatus();
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
        if (companyData.canManageCompanies) {
          router.push('/dashboard');
          return;
        } else {
          setLoginError(
            'You are not registered as a partner, please contact us at support@fena.co if you want to become one!'
          );
        }
      }
    } catch (error: NotAuthorizedException) {
      console.error(error);
      setLoginError(error.message);
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
              {loginError}
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
        </Form>
      </LogIn>
    </LogInWrapper>
  );
};

export default LoginWithEmail;
