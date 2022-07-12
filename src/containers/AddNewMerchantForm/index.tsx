import { NextPage } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';
import CountrySelectionDropdown from '../../components/CountrySelectionDropdown';
import SelectDropDown from '../../components/SelectDropDown';
import Typography from '../../components/Typography';
import ButtonWithChildren from '../../components/Button';
import AddNewMerchantSoleTraderForm from '../AddNewMerchantSoleTraderForm';
import AddNewMerchantLimitedCompanyForm from '../AddNewMerchantLimitedCompanyForm';
import AddBankAccountForm from '../AddBankAccountForm';

enum businessTypes {
  individual = 'Sole Trader / Individual',
  limited = 'Limited Company',
}

const Content = styled.section`
  display: flex;
  flex-direction: column;
  padding: 30px calc((100vw - 380px) / 2);
`;

const Title = styled(Typography)`
  text-align: center;
  &:last-of-type {
    padding-top: 30px;
    margin-bottom: 10px;
  }
`;

const WrapperTextField = styled.div`
  margin-top: 10px;
  &:first-child {
    margin-top: 0px;
  }
`;

const MenuItem = styled.li`
  list-style: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  text-transform: capitalize;
  color: #13273f;
  padding: 12px 23px;
  display: flex;
  align-items: center;
  cursor: pointer;

  :hover {
    background: #f4f7f9;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const AddNewMerchantForm: NextPage = () => {
  const [countryData, setCountry] = useState<{
    country?: string;
    countryName?: string;
  }>();

  const [businessType, setBusinessType] =
    useState<keyof typeof businessTypes>();

  const onBusinessTypeChange = (type: keyof typeof businessTypes) => () =>
    setBusinessType(type);

  return (
    <Content>
      <Title variant="subtitle4">Add new merchant</Title>
      <WrapperTextField>
        <CountrySelectionDropdown
          value={countryData}
          required
          label="Registration country"
          onChange={setCountry}
          placeholder="Select your country..."
        />
      </WrapperTextField>
      <WrapperTextField>
        <SelectDropDown
          label="Business structure"
          required
          value={businessType ? businessTypes[businessType] : null}
          placeholder="Choose your business structure"
          fullWidth
        >
          <MenuItem onClick={onBusinessTypeChange('limited')}>
            Limited Company
          </MenuItem>
          <MenuItem onClick={onBusinessTypeChange('individual')}>
            Sole Trader / Individual
          </MenuItem>
        </SelectDropDown>
      </WrapperTextField>

      {businessType === 'individual' && (
        <AddNewMerchantSoleTraderForm countryData={countryData} />
      )}
      {businessType === 'limited' && <AddNewMerchantLimitedCompanyForm />}
      {businessType && <AddBankAccountForm />}
      <ButtonWrapper>
        <ButtonWithChildren variant="contained">ADD</ButtonWithChildren>
      </ButtonWrapper>
    </Content>
  );
};

export default AddNewMerchantForm;
