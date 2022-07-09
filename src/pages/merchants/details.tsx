import styled, { css } from 'styled-components';
import ArrowLeftIcon from 'image/icon/arrow-back.svg';
import Typography from '../../components/Typography';
import { useState } from 'react';
import { Transaction } from '../../types/api';
import BankAccountCard from '../../components/BankAccountCard';
import CopyInput from '../../components/CopyInput';

const BackButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BackIcon = styled(ArrowLeftIcon)`
  margin-right: 10px;
`;

const Container = styled.div`
  margin-top: 25px;
  padding: 0 35px;
  border: 1px solid #dbe3eb;
  box-sizing: border-box;
  border-radius: 10px;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DetailsWrapper = styled.div`
  border-top: 1px solid #dbe3eb;
  display: flex;
  padding-top: 50px;
  padding-bottom: 150px;
`;

const HeaderMenu = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const HeaderMenuItemActiveCss = css`
  border-bottom: 2px solid #2cd19e;
`;

const HeaderMenuItem = styled(Typography)<{ active?: boolean }>`
  padding: 25px 0px;
  margin: 0px 25px;
  cursor: pointer;
  ${({ active }) => active && HeaderMenuItemActiveCss};
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }
`;

const DetailsContainer = styled.div`
  margin-right: 80px;
`;

const Title = styled(Typography)`
  margin-bottom: 10px;
`;

const BankAccountCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #dbe3eb;
  padding: 50px 0;
`;

const VerificationContainer = styled.div`
  display: flex;
  flex-basis: 100%;
`;

const StatusWrapper = styled.div`
  display: flex;
`;

const Status = styled.div<{ status: string }>`
  border-radius: 5px;
  padding: 5px 15px;
  background-color: ${(props) =>
    props.status === 'verified' ? '#E4F9F2' : '#fce4e2'};
  color: ${(props) => (props.status === 'verified' ? '#2CD19E' : '#EF6355')};
`;

const TableWrapper = styled.div`
  display: flex;
  flex-basis: 35%;
`;

const Table = styled.table`
  margin-right: 50px;
`;

const ChecksCell = styled.td`
  padding-right: 50px;
`;

const Checks = styled(Typography)``;

const StatusCell = styled.td``;

const Th = styled.th`
  text-align: start;
`;

const ShareSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 40%;
`;

const CopyInputWrapper = styled.div`
margin-top: 15px;
`;

interface DetailsProps {
  handleClose: () => void;
}

const user = {
  firstName: 'Gosia',
  lastName: 'Furmanik',
  email: 'gosia@fena.co',
  phoneNumber: '+44 5677 8907',
  supportPhone: '+44 5677 8908',
  supportEmail: 'isaac@fena.co',
};

const company = {
  identifier: '123456789',
  type: 'company',
  registeredName: 'Allies Computing Ltd',
  address: {
    addressLine1: 'Manor Farm Barns',
    addressLine2: 'Fox Road',
    city: 'NORWICH',
    zipCode: 'E1 0FD',
  },
  tradingName: '10 Downing Street',
  tradingAddress: {
    addressLine1: '1High Street, Weybridje - 45 Address KT13',
  },
};

const accounts = [
  {
    attachmentUrl:
      'https://s3.eu-west-2.amazonaws.com/fena-stage/2022-06-07T09%3A19%3A05.348Zimage%20%283%29.png',
    createdAt: '2022-06-07T09:19:05.161Z',
    deletedAt: null,
    externalAccountId: '13827551',
    identification: '070246',
    identificationType: 'SORT_CODE_ACCOUNT_NUMBER',
    name: 'Nationwide',
    owner: '62863cb44b34d4e4ebe23483',
    ownerType: 'Company',
    provider: {
      countryId: 'GB',
      deletedAt: null,
      enabled: true,
      externalId: 'ob-nationwide',
      logo: 'https://fena-assets.s3.eu-west-2.amazonaws.com/banks/nationwide.png',
      name: 'Nationwide',
      __v: 0,
      _id: '62339d64ce1712d21eb055ef',
    },
    status: 'verified',
    __v: 0,
    _id: '629f1809de0f2c70d177d3d6',
  },
  {
    attachmentUrl:
      'https://s3.eu-west-2.amazonaws.com/fena-stage/2022-06-07T09%3A19%3A05.348Zimage%20%283%29.png',
    createdAt: '2022-06-07T09:19:05.161Z',
    deletedAt: null,
    externalAccountId: '13827551',
    identification: '070246',
    identificationType: 'SORT_CODE_ACCOUNT_NUMBER',
    name: 'Nationwide',
    owner: '62863cb44b34d4e4ebe23483',
    ownerType: 'Company',
    _id: '62339d64ce1712d21eb055ef',
    status: 'verified',
    provider: {
      countryId: 'GB',
      deletedAt: null,
      enabled: true,
      externalId: 'ob-nationwide',
      logo: 'https://fena-assets.s3.eu-west-2.amazonaws.com/banks/nationwide.png',
      name: 'Nationwide',
      __v: 0,
      _id: '62339d64ce1712d21eb055ef',
    },
  },
  {
    attachmentUrl:
      'https://s3.eu-west-2.amazonaws.com/fena-stage/2022-06-07T09%3A19%3A05.348Zimage%20%283%29.png',
    createdAt: '2022-06-07T09:19:05.161Z',
    deletedAt: null,
    externalAccountId: '13827551',
    identification: '070246',
    identificationType: 'SORT_CODE_ACCOUNT_NUMBER',
    name: 'Nationwide',
    owner: '62863cb44b34d4e4ebe23483',
    ownerType: 'Company',
    _id: '62339d64ce1712d21eb055ef',
    status: 'verified',
    provider: {
      countryId: 'GB',
      deletedAt: null,
      enabled: true,
      externalId: 'ob-nationwide',
      logo: 'https://fena-assets.s3.eu-west-2.amazonaws.com/banks/nationwide.png',
      name: 'Nationwide',
      __v: 0,
      _id: '62339d64ce1712d21eb055ef',
    },
  },
];

const Details: React.FunctionComponent<DetailsProps> = ({ handleClose }) => {

  const [activePage, setActivePage] = useState<string>('company');
  return (
    <>
      <BackButton onClick={() => handleClose()}>
        <BackIcon />
        <Typography variant="body5">Back to merchants</Typography>
      </BackButton>
      <Container>
        <ContentHeader>
          <HeaderMenu>
            <HeaderMenuItem
              onClick={() => setActivePage('company')}
              active={activePage === 'company'}
            >
              Company Details
            </HeaderMenuItem>
            <HeaderMenuItem
              onClick={() => setActivePage('personal')}
              active={activePage === 'personal'}
            >
              Personal Details
            </HeaderMenuItem>
            <HeaderMenuItem
              onClick={() => setActivePage('bankAccounts')}
              active={activePage === 'bankAccounts'}
            >
              Bank Accounts
            </HeaderMenuItem>
            <HeaderMenuItem
              onClick={() => setActivePage('verification')}
              active={activePage === 'verification'}
            >
              Verification
            </HeaderMenuItem>
          </HeaderMenu>
          
        </ContentHeader>
        {activePage === 'company' && (
          <DetailsWrapper>
            <DetailsContainer>
              <Title variant="body5">Company number</Title>
              <Typography variant="lightBody">{company.identifier}</Typography>
              <Typography variant="lightBody">{company.type}</Typography>
            </DetailsContainer>
            <DetailsContainer>
              <Title variant="body5">Registered name</Title>
              <Typography variant="lightBody">
                {company.registeredName}
              </Typography>
            </DetailsContainer>
            <DetailsContainer>
              <Title variant="body5">Registered address</Title>
              <Typography variant="lightBody">
                {company.address.addressLine1}
              </Typography>
              <Typography variant="lightBody">
                {company.address.addressLine2}
              </Typography>
              <Typography variant="lightBody">
                {company.address.city}
              </Typography>
              <Typography variant="lightBody">
                {company.address.zipCode}
              </Typography>
            </DetailsContainer>
            <DetailsContainer>
              <Title variant="body5">Trading name</Title>
              <Typography variant="lightBody">{company.tradingName}</Typography>
            </DetailsContainer>
            <DetailsContainer>
              <Title variant="body5">Trading address</Title>
              <Typography variant="lightBody">
                {company.tradingAddress.addressLine1}
              </Typography>
            </DetailsContainer>
          </DetailsWrapper>
        )}

        {activePage === 'personal' && (
          <DetailsWrapper>
            <DetailsContainer>
              <Title variant="body5">Primary contact details</Title>
              <Typography variant="lightBody">
                {user.firstName}
                {` `}
                {user.lastName}
              </Typography>
              <Typography variant="lightBody">{user.email}</Typography>
              <Typography variant="lightBody">{user.phoneNumber}</Typography>
            </DetailsContainer>
            <DetailsContainer>
              <Title variant="body5">Secondary contact details</Title>
              <Typography variant="lightBody">
                {user.firstName}
                {` `}
                {user.lastName}
              </Typography>
              <Typography variant="lightBody">{user.supportEmail}</Typography>
              <Typography variant="lightBody">{user.supportPhone}</Typography>
            </DetailsContainer>
          </DetailsWrapper>
        )}

        {activePage === 'bankAccounts' && (
          <BankAccountCardWrapper>
            {accounts.map((acc) => {
              return (
                <BankAccountCard
                  key={acc._id}
                  account={{
                    accountName: acc.name,
                    accountNumber: acc.externalAccountId,
                    bankImg: acc.provider.logo,
                    sortCode: acc.identification,
                    title: acc.provider.name,
                    status: acc.status,
                    accId: acc._id,
                  }}
                  getBankAccounts={() => {}}
                />
              );
            })}
          </BankAccountCardWrapper>
        )}

        {activePage === 'verification' && (
          <DetailsWrapper>
            <VerificationContainer>
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                      <Th></Th>
                      <Th>
                        <Typography variant="body5">STATUS</Typography>
                      </Th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <ChecksCell>
                        <Checks variant="body5">AML checks</Checks>
                      </ChecksCell>
                      <StatusCell>
                        <StatusWrapper>
                          <Status status="verified">Verified</Status>
                        </StatusWrapper>
                      </StatusCell>
                    </tr>
                    <tr>
                      <ChecksCell>
                        <Checks variant="body5">Identity checks</Checks>
                      </ChecksCell>
                      <StatusCell>
                        <StatusWrapper>
                          <Status status="unverified">Unverified</Status>
                        </StatusWrapper>
                      </StatusCell>
                    </tr>
                  </tbody>
                </Table>
              </TableWrapper>

              <ShareSection>
                <Title variant="subtitle5">
                  Share verification link
                </Title>
                <Typography variant="lightBody">
                  Share the verification link with your merchants to enable them
                  to complete ID verification. Just copy the link and share via
                  email, SMS, whatsapp or any other messaging service
                </Typography>
                <CopyInputWrapper>
                  <CopyInput value="https://app.fena.com/r/mw0" />
                </CopyInputWrapper>
              </ShareSection>
            </VerificationContainer>
          </DetailsWrapper>
        )}
      </Container>
    </>
  );
};

export default Details;
