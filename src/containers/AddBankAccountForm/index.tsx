import { NextPage } from 'next';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import Typography from '../../components/Typography';
import { COUNTRY_CODES } from '../../constant/countries';
import { CompanyTypes } from '../../types/api';
import * as yup from 'yup';
import { runValidation } from '../../util/formValidation';
import IndustrySelectionDropdown from '../../components/Dropdown';
import SearchIcon from 'image/icon/search-blue.svg';
import PhoneInput from '../../components/PhoneInput';
import ProviderSelectionDropdown from '../../components/ProviderSelectionDropdown';
import ShareVerificationLink from '../../components/ShareVerificationLink';
import ButtonWithChildren from '../../components/Button';
import CheckBox from '../../components/Checkbox';

const addNewMerchantSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/[0-9]+/, 'Phone number is not valid')
    .matches(/\w{2} 0?\d{0,10}$/, 'Phone number length exceeded'),
  identification: yup.string().min(6, 'Sort code must be 6 digits'),
  externalAccountId: yup.string().min(8, 'Account number must be 8 digits'),
});

const limitedCompanySchema = addNewMerchantSchema.concat(
  yup.object().shape({
    crn: yup
      .string()
      .min(8, 'Enter valid CRN')
      .max(8, 'Enter valid CRN')
      .matches(/[a-zA-Z]{2}[0-9]{6}|[0-9]{8}/, 'Enter valid CRN'),
  })
);

const soleTraderSchema = addNewMerchantSchema.concat(
  yup.object().shape({
    utr: yup
      .string()
      .matches(/^[0-9]*$/, 'UTR cannot include letters')
      .nullable()
      .transform((o, c) => (o === '' ? null : c))
      .min(10, 'Enter valid UTR')
      .max(10, 'Enter valid UTR'),
  })
);

const businessTypes = {
  individual: 'Sole Trader / Individual',
  limited: 'Limited Company',
};

const company: any = {
  countryName: 'United Kingdom',
  code: '+44',
  country: 'GB',
  identifier: '',
  tradingName: '',
  tradingAddress: '',
  industry: '',
};

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

const WrapperCheckBox = styled.div`
  margin-top: 30px;
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

const ConnectBankAccount = styled.div``;

const ShareWrapper = styled.div`
  margin-top: 30px;
`;

const Banner = styled.div`
  padding: 15px;
  margin-top: 30px;
  background-color: rgba(44, 209, 158, 0.05);
  border-radius: 5px;
  border: 1px solid rgba(44, 209, 158, 0.4);
`;

const Email = styled.a`
  color: #38b6ff;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const RadioInput = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
`;

const RadioButton = styled.input`
  accent-color: black;
  margin-right: 10px;
`;

interface AddBankAccountProps {
  control: Control;
}

const AddBankAccountForm: NextPage<AddBankAccountProps> = ({ control }) => {
  const [bankDetailsType, setBankDetailsType] = useState('manually');

  const [isDirector, setIsDirector] = useState(false);

  const [providers, setProviders] = useState([
    {
      id: '62339d64ce1712d21eb055e4',
      name: 'Bank of Scotland Business',
      providerExternalId: 'ob-bos-business',
      value: '62339d64ce1712d21eb055e4',
    },
    {
      id: '62339d64ce1712d21eb055e6',
      name: 'Barclays Business',
      providerExternalId: 'ob-barclays-business',
      value: '62339d64ce1712d21eb055e6',
    },
  ]);

  const mappedProviders = providers.map((el) => ({
    label: el.name,
    value: el.value,
  }));

  // const getProviders = async () => {
  //   const results = await Api.getProviders();
  //   const mapped = results.map((result: any) => ({
  //     name: result.name,
  //     value: result._id,
  //   }));
  //   setProviders(mapped);
  // };

  return (
    <>
      <Title variant="subtitle4">Add bank account</Title>
      <RadioInput>
        <RadioButton
          type="radio"
          checked={bankDetailsType === 'manually'}
          onChange={() => setBankDetailsType('manually')}
        />
        <Typography variant="lightBody">Add the details manually</Typography>
      </RadioInput>
      <RadioInput>
        <RadioButton
          type="radio"
          checked={bankDetailsType === 'ask'}
          onChange={() => setBankDetailsType('ask')}
        />
        <Typography variant="lightBody">
          Ask merchant to add their bank account using online banking
        </Typography>
      </RadioInput>
      <ConnectBankAccount>
        {bankDetailsType === 'manually' ? (
          <>
            <DropdownFormField
              name="provider"
              control={control}
              placeholder="Choose bank"
              label="Industry"
              items={mappedProviders}
            />
            <TextFormField name="name" control={control} label="Account name" />
            <TextFormField
              name="identification"
              control={control}
              label="Sort code"
              mask="99-99-99"
            />
            <TextFormField
              name="externalAccountId"
              control={control}
              label="Account number"
              mask="99999999"
            />
          </>
        ) : (
          <Banner>
            <Typography variant="body4">
              We will send a link to add a bank account to the email address
              <Email>{` `}isaac@gmai.com</Email>
            </Typography>
          </Banner>
        )}

        <ShareWrapper>
          <ShareVerificationLink />
        </ShareWrapper>
      </ConnectBankAccount>
    </>
  );
};

export default AddBankAccountForm;
