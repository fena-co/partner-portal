import styled from 'styled-components';
import CopyInput from '../CopyInput';
import Typography from '../Typography';
import UrlWrapper from '../UrlWrapper';

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

const Table = styled.table`
  width: 100%;
`;

const DirectorHead = styled.th`
  width: 200px;
`;

const LinkHead = styled.th``;

const DirectorP = styled(Typography)`
  text-align: start;
  padding-bottom: 10px;
`;

const TableCell = styled.td`
  padding: 10px 0;
  border-bottom: 1px solid #dbe3eb;
`;

const LinkP = styled(Typography)`
  text-align: start;
  padding-bottom: 10px;
`;
interface ShareVerificationLinkProps {
  verificationData: {
    director: string;
    verificationLink: string;
  }[];
}

const ShareVerificationLink: React.FunctionComponent<
  ShareVerificationLinkProps
> = ({ verificationData }) => {
  return (
    <ShareSection>
      <Title variant="subtitle5">Share verification link</Title>
      <Typography variant="lightBody">
        Share the verification link with your merchants to enable them to
        complete ID verification. Just copy the link and share via email, SMS,
        whatsapp or any other messaging service
      </Typography>
      <CopyInputWrapper>
        <Table>
          <thead>
            <tr>
              <DirectorHead>
                <DirectorP>Director</DirectorP>
              </DirectorHead>
              <LinkHead>
                <LinkP>Link</LinkP>
              </LinkHead>
            </tr>
          </thead>
          <tbody>
            {verificationData.map((item) => {
              return (
                <tr key={item.verificationLink}>
                  <TableCell>
                    <Typography>{item.director}</Typography>
                  </TableCell>
                  <TableCell>
                    <UrlWrapper>{item.verificationLink}</UrlWrapper>
                  </TableCell>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {/* <CopyInput value="https://app.fena.com/r/mw0" /> */}
      </CopyInputWrapper>
    </ShareSection>
  );
};

export default ShareVerificationLink;
