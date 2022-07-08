import styled, { css } from 'styled-components';
import ArrowLeftIcon from 'image/icon/arrow-back.svg';
import Typography from '../../components/Typography';
import { useState } from 'react';
import { Transaction } from '../../types/api';
import moment from 'moment';

const Content = styled.section``;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

const DetailsTable = styled.table`
  text-align: left;

  & > tr:nth-child(even) {
    background-color: #f4f7f9;
  }
`;

const DetailsHeader = styled.th`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 36px;
`;

const DetailsCell = styled.td`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 36px;
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
const Details: React.FunctionComponent<DetailsProps> = ({ handleClose }) => {
  const [transactionData, setTransactionData] = useState<Transaction | null>(
    null
  );
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
          {/* Hiding the button for now */}
          {/* <ButtonCreation variant="contained">Download Receipt</ButtonCreation> */}
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

        {activePage === 'delivery' && (
          <DetailsWrapper>
            <DetailsTable>
              <tr>
                <DetailsHeader>Address Line 1: </DetailsHeader>
                <DetailsCell>{'None'}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Address Line 2: </DetailsHeader>
                <DetailsCell>{'None'}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>City: </DetailsHeader>
                <DetailsCell>{'-'}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Post Code: </DetailsHeader>
                <DetailsCell>{'None'}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Country: </DetailsHeader>
                <DetailsCell>{'None'}</DetailsCell>
              </tr>
            </DetailsTable>
          </DetailsWrapper>
        )}
      </Container>
    </>
  );
};

export default Details;
