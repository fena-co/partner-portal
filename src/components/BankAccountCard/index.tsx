import React, { useState } from 'react';
import styled from 'styled-components';
import Api from '../../util/api';
import Typography from '../Typography';
import EditIcon from 'image/icon/edit-pen.svg';
import ButtonText from '../ButtonText';

interface BankAccountCardProps {
  account: {
    title: string;
    bankImg: string;
    accountName: string;
    accountNumber: string;
    sortCode: string;
    status: string;
    accId: string;
    companyId: string;
  };
  getBankAccounts: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 40%;
  background: #f4f7f9;
  border-radius: 5px;
  padding: 35px 20px 35px 20px;
  margin-right: 30px;
  margin-bottom: 30px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 16px;
  text-transform: uppercase;
  color: #13273f;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const AccountImage = styled.div`
  padding: 0;
  margin: 0;

  img {
    width: 50px;
    height: 50px;
    background: #ffffff;
    border: 1px solid #dbe3eb;
    box-sizing: border-box;
    border-radius: 5px;
    object-fit: contain;
  }
`;

const InfoField = styled.div`
  background: #ffffff;
  border: 1px solid #dbe3eb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #13273f;
  display: flex;
  justify-content: space-between;
`;

const ActiveInfoField = styled.input`
  background: #ffffff;
  border: 1px solid #dbe3eb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #13273f;
  width: 100%;
`;

const InfoLabel = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;

  color: #6c6c8a;
  margin: 7px 0;
`;

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr) repeat(3, 0);
  grid-column-gap: 24px;
  grid-row-gap: 5px;
  max-height: 200px;
`;

const AccountActions = styled.button`
  background: none;
  border: none;
  padding-left: 3px;
  width: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StatusGreen = styled(Typography)`
  color: #2cd19e;
`;

const StatusRed = styled(StatusGreen)`
  color: #ef6355;
`;

const TitleAndStatus = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelAndButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NameButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const NameCancelButton = styled(ButtonText)`
  margin-right: 10px;
  height: 35px;
`;

const NameSaveButton = styled(ButtonText)`
  height: 35px;
`;

const Edit = styled(EditIcon)`
  cursor: pointer;
`;

function BankAccountCard({ account, getBankAccounts }: BankAccountCardProps) {
  const [isEditMode, setEditMode] = useState(false);
  const [accName, setName] = useState(account.accountName);

  const onBankAccountSave = async () => {
    setEditMode(false);
    const response = await Api.updateAccount(
      { name: accName },
      account.companyId,
      account.accId
    );
    console.log(response);
    getBankAccounts();
  };
  return (
    <Container>
      <Header>
        <TitleAndStatus>
          <Title>{account.title}</Title>
          {account.status === 'verified' ? (
            <StatusGreen variant="body4">Verified</StatusGreen>
          ) : account.status === 'disabled' ? (
            <StatusRed variant="body4">Disabled</StatusRed>
          ) : (
            <StatusRed variant="body4">Pending verification</StatusRed>
          )}
        </TitleAndStatus>

        <HeaderRight>
          <AccountImage>
            <img src={account.bankImg} alt="bank-logo" />
          </AccountImage>
        </HeaderRight>
      </Header>
      <InfoWrapper>
        <div style={{ gridArea: '1 / 1 / 2 / 6' }}>
          <LabelAndButton>
            <InfoLabel>Account Name</InfoLabel>
          </LabelAndButton>
          {!isEditMode ? (
            <InfoField>
              {accName}
              <Edit
                onClick={() => {
                  setEditMode(!isEditMode);
                }}
              />
            </InfoField>
          ) : (
            <ActiveInfoField
              autoFocus
              value={accName}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <NameButtons>
            {isEditMode && (
              <NameCancelButton
                variant="outlined"
                onClick={() => {
                  setName(account.accountName);
                  setEditMode(!isEditMode);
                }}
              >
                Cancel
              </NameCancelButton>
            )}
            {isEditMode && (
              <NameSaveButton variant="contained" onClick={onBankAccountSave}>
                Save
              </NameSaveButton>
            )}
          </NameButtons>
        </div>
        <div style={{ gridArea: '2 / 1 / 3 / 3' }}>
          <InfoLabel>Sort Code</InfoLabel>
          <InfoField>{account.sortCode}</InfoField>
        </div>
        <div style={{ gridArea: '2 / 3 / 3 / 6' }}>
          <InfoLabel>Account Number</InfoLabel>
          <InfoField>{account.accountNumber}</InfoField>
        </div>
      </InfoWrapper>
    </Container>
  );
}

export default BankAccountCard;
