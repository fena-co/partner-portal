import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import '../components/DayInput/datepicker.css';
import { Amplify } from 'aws-amplify';

const config = {
  aws_project_region: process.env.REGION,
  aws_cognito_region: process.env.REGION,
  aws_user_pools_id: process.env.COGNITO_USER_POOL,
  aws_user_pools_web_client_id: process.env.COGNITO_USER_POOL_WEB_CLIENT_ID,
  Auth: {
    identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
    region: process.env.REGION,
    userPoolId: process.env.COGNITO_USER_POOL,
    userPoolWebClientId: process.env.COGNITO_USER_POOL_WEB_CLIENT_ID,
  },
};

Amplify.configure(config);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
