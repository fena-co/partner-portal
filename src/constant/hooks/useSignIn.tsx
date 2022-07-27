import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';


import Api from '../../util/api';
import { setUserData } from '../../store/user';
import { ROUTES } from '../route';
import { setCompanyData } from '../../store/company';

export const useSignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const checkSignInStatus = async () => {
    try {
      const session = await Auth.currentSession();
      const accessToken = session.getAccessToken();
      const jwt = accessToken.getJwtToken();
      Api.updateHeadersWithToken(jwt);
      if (typeof window !== 'undefined') {
        localStorage.setItem('fenaToken', jwt);
      }
      const user = await Api.getUser();
      console.log(user);
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
          job: user.job,
          phoneNumber: user.phoneNumber,
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
      await router.push(ROUTES.TRANSACTION);
    } catch (e) {
      console.error(e);
    }
  };

  return { checkSignInStatus };
};
