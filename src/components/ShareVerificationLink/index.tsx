import styled from 'styled-components';
import CopyInput from '../CopyInput';
import Typography from '../Typography';

const ShareSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 40%;
`;

const Title = styled(Typography)`
  margin-bottom: 10px;
`;

const CopyInputWrapper = styled.div`
  margin-top: 15px;
`;

const ShareVerificationLink: React.FunctionComponent = () => {
  return (
    <ShareSection>
      <Title variant="subtitle5">Share verification link</Title>
      <Typography variant="lightBody">
        Share the verification link with your merchants to enable them to
        complete ID verification. Just copy the link and share via email, SMS,
        whatsapp or any other messaging service
      </Typography>
      <CopyInputWrapper>
        <CopyInput value="https://app.fena.com/r/mw0" />
      </CopyInputWrapper>
    </ShareSection>
  );
};

export default ShareVerificationLink;
