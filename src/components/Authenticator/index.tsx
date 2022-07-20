import { FC, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Api from '../../util/api';
import { setUserData } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setCompanyData } from '../../store/company';
import { getUserSelector } from '../../store/selectors/user';
import { CompanyStatus } from '@fena/types';

const Authenticator: FC<any> = ({ pageProps, children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const logged = useSelector(getUserSelector).loggedIn;

  useEffect(() => {
    (async () => {
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
            emailChasersStatus: user.emailChasersStatus,
            emailVerified: user.emailVerified,
          })
        );
        setIsLoggedIn(true);

        const params = new URLSearchParams(window.location.search);
        const email = params.get('email');
        const code = params.get('code');
        if (code && email) {
          setLoading(false);
          return;
        }
        if (!user.phoneNumber) {
          await router.push({
            pathname: '/register/additional',
          });
          setLoading(false);
          return;
        }
        if (!user.company) {
          await router.push({
            pathname: '/register/business/',
          });
          setLoading(false);
          return;
        }
        if (user.company.status === CompanyStatus.BANNED) {
          await router.push({ pathname: '/login/suspended' });
          setLoading(false);
          return;
        }
        const companyData = await Api.getCompany();
        console.log('companyData', companyData);
        dispatch(
          setCompanyData({
            ...companyData,
          })
        );
        /* if (
          user.company.type === CompanyTypes.COMPANY &&
          !user.company.tradingAddress
        ) {
          await router.push({
            pathname: '/register/business/limited',
          });
          setLoading(false);
          return;
        }
        if (router.pathname.includes('login')) {
          await router.push({
            pathname: '/dashboard/transactions',
          });
        }*/
        setLoading(false);
      } catch (e) {
        if (pageProps.protected) {
          console.log('redirected due to error');
          await router.push({
            pathname: '/login',
          });
        }
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (logged) {
      setIsLoggedIn(true);
    }
  }, [logged]);

  useEffect(() => {
    if (loading) return;
    if (pageProps.protected && !loggedIn) {
      console.log('redirected in useeffect');
      router.push({
        pathname: '/login',
      });
    }
  }, [pageProps.protected, loggedIn]);

  if (loading) return <div>Loading</div>;

  return children;
};

export default Authenticator;
