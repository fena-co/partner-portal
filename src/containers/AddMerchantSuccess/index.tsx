import router from 'next/router';
import styled from 'styled-components';
import ButtonWithChildren from '../../components/Button';
import Hypertext from '../../components/Hypertext';
import Typography from '../../components/Typography';
import { ROUTES } from '../../constant/route';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: calc(100vh - 135px * 2); */
  padding-top: 20px;
`;

const Title = styled(Typography)`
  text-align: center;
  margin-bottom: 20px;
`;

const Text = styled(Typography)`
  text-align: center;
  margin-bottom: 20px;
`;

const Circle = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    47.29deg,
    #2cd19e 12.72%,
    #47ef90 85.89%,
    #3ce396 85.89%
  );
  border: 15px solid #e5f7f0;
  height: 65px;
  width: 65px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const Tick = styled.img``;

interface SuccessContainer {
  email: string;
  sendEmail: boolean;
}

const SuccessContainer: React.FunctionComponent<SuccessContainer> = ({
  email,
  sendEmail,
}) => {
  return (
    <Container>
      <Circle>
        <Tick src="/image/icon/tick.svg" alt="tick" />
      </Circle>
      <Title variant="subtitle5">Success</Title>
      {sendEmail && (
        <Text>
          KYC verification was successfully sent to your email address:
          <Hypertext>&nbsp;{email}</Hypertext>
        </Text>
      )}

      <ButtonWithChildren
        onClick={() => router.push(ROUTES.MERCHANTS)}
        variant="contained"
      >
        OK
      </ButtonWithChildren>
    </Container>
  );
};

export default SuccessContainer;
