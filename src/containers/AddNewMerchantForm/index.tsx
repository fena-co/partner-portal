import { NextPage } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import CountrySelectionDropdown from '../../components/CountrySelectionDropdown';
import SelectDropDown from '../../components/SelectDropDown';
import Typography from '../../components/Typography';
import ButtonWithChildren from '../../components/Button';
import AddNewMerchantSoleTraderForm from '../AddNewMerchantSoleTraderForm';
import AddNewMerchantLimitedCompanyForm from '../AddNewMerchantLimitedCompanyForm';
import AddBankAccountForm from '../AddBankAccountForm';
import Form from '../../components/Form';

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

const soleTraderSchema = yup.object({
  utr: yup
    .string()
    .matches(/^[0-9]*$/, 'UTR cannot include letters')
    .nullable()
    .transform((o, c) => (o === '' ? null : c))
    .min(10, 'Enter valid UTR')
    .max(10, 'Enter valid UTR'),
  tradingName: yup.string().required('This field is required'),
  tradingAddress: yup.string().required('This field is required'),
  industry: yup.object({
    label: yup.string(),
    value: yup.string(),
  }),
  taxpayerId: yup.string(),
  businessName: yup.string().required('This field is required'),
  businessAddress: yup.string().required('This field is required'),
  contactName: yup.string().required('This field is required'),
  email: yup
    .string()
    .required('This field is required')
    .email('Email must be valid'),
  phoneNumber: yup.object({
    code: yup.string().required(),
    number: yup
      .string()
      .required('This field is required')
      .matches(/^[0-9]+$/, 'Phone number is not valid')
      .matches(/^0?\d{0,10}$/, 'Phone number length exceeded'),
  }),
  // identification: yup.string().min(6, 'Sort code must be 6 digits'),
  // externalAccountId: yup.string().min(8, 'Account number must be 8 digits'),
});

const AddNewMerchantForm: NextPage = () => {
  const soleTraderDefaultValues = {
    utr: '',
    tradingName: '',
    tradingAddress: '',
    businessName: '',
    businessAddress: '',
    contactName: '',
    email: '',
    industry: { label: '', value: '' },
    taxpayerId: '',
    phoneNumber: {
      code: 'GB',
      number: '',
    },
  };

  const [countryData, setCountry] = useState<{
    country?: string;
    countryName?: string;
  }>({});

  const [businessType, setBusinessType] =
    useState<keyof typeof businessTypes>();

  const onBusinessTypeChange = (type: keyof typeof businessTypes) => () =>
    setBusinessType(type);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Content>
      <Title variant="subtitle4">Add new merchant</Title>
      <WrapperTextField>
        <CountrySelectionDropdown
          required
          value={countryData.countryName}
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
      <Form
        onSubmit={onSubmit}
        defaultValues={soleTraderDefaultValues}
        validationSchema={soleTraderSchema}
      >
        {businessType === 'individual' && countryData?.country && (
          <AddNewMerchantSoleTraderForm countryData={countryData} />
        )}
        {/* {businessType === 'limited' && <AddNewMerchantLimitedCompanyForm />} */}
        {/* {businessType && <AddBankAccountForm />} */}
        {/* <ButtonWrapper>
          <ButtonWithChildren type="submit" variant="contained">
            ADD
          </ButtonWithChildren>
        </ButtonWrapper> */}
      </Form>
    </Content>
  );
};

export default AddNewMerchantForm;
