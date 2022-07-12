import { NextPage } from 'next';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import TextFieldComponent from '../../components/Textfield';
import * as yup from 'yup';
import { runValidation } from '../../util/formValidation';
import IndustrySelectionDropdown from '../../components/IndustrySelectionDropdown';
import SearchIcon from 'image/icon/search-blue.svg';
import PhoneInput from '../../components/PhoneInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const soleTraderSchema = yup.object().shape({
  utr: yup
    .string()
    .matches(/^[0-9]*$/, 'UTR cannot include letters')
    .nullable()
    .transform((o, c) => (o === '' ? null : c))
    .min(10, 'Enter valid UTR')
    .max(10, 'Enter valid UTR'),
  phoneNumber: yup
    .string()
    .matches(/[0-9]+/, 'Phone number is not valid')
    .matches(/\w{2} 0?\d{0,10}$/, 'Phone number length exceeded'),
  identification: yup.string().min(6, 'Sort code must be 6 digits'),
  externalAccountId: yup.string().min(8, 'Account number must be 8 digits'),
});

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

const WrapperTextField = styled.div`
  margin-top: 10px;
  &:first-child {
    margin-top: 0px;
  }
`;

interface AddNewMerchantSoleTraderFormProps {
  countryData: {
    country?: string;
    countryName?: string;
  }
}

const AddNewMerchantSoleTraderForm: React.FunctionComponent<AddNewMerchantSoleTraderFormProps> = ({ countryData: { country }}) => {
  // cool code starts here
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(soleTraderSchema),
  });
  // cool code ends here

  const [soleTraderFormData, setSoleTraderFormData] = useState({
    utr: company.identifier || '',
    tradingName: company.tradingName || '',
    tradingAddress: company.tradingAddress || '',
    businessName: company.businessName || '',
    businessAddress: company.businessAddress || '',
    contactName: company.contactName || '',
    email: company.email || '',
    industry: company.industry || '',
    taxpayerId: company.taxpayerId || '',
  });

  const onChange =
    (key: string) => async (event: ChangeEvent<HTMLInputElement>) => {
      // if (businessType === 'limited') {
      //   const newValues = { ...limitedFormData, [key]: event.target.value };
      //   setLimitedFormData(newValues);
      //   console.log(key, country, event.target.value);
      //   if (key === 'crn' && country.country === 'GB') {
      //     runValidation(addNewMerchantSchema, newValues).then((err) => {
      //       setFormErrors(err);
      //     });
      //   }
      //   if (
      //     key === 'crn' &&
      //     country.country === 'GB' &&
      //     event.target.value.length >= 8
      //   ) {
      //   }
      // } else {
      //   const newValues = {
      //     ...soleTraderFormData,
      //     [key]: event.target.value,
      //   };
      //   setSoleTraderFormData(newValues);
      //   if (key === 'utr' && country.country === 'GB') {
      //     runValidation(addNewMerchantSchema, newValues).then((err) => {
      //       setFormErrors(err);
      //     });
      //   }
      // }
    };

  const onChangeIndustry = (name: string) => {
    // if (businessType === 'limited') {
    //   setLimitedFormData({ ...limitedFormData, industry: name });
    // } else {
    //   setSoleTraderFormData({ ...soleTraderFormData, industry: name });
    // }
  };

  const onSubmit = (data: any) => console.log(data, errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WrapperTextField>
        <TextFieldComponent
          {...register('utr')}
          error={errors.utr?.[0]}
          label={
            country !== 'GB'
              ? 'Taxpayer identification number'
              : 'Unique Taxpayer Reference (UTR)'
          }
          inputProps={{
            required: country !== 'GB' && true,
            value: soleTraderFormData.utr,
          }}
        />
      </WrapperTextField>
      <WrapperTextField>
        <TextFieldComponent
          label="Trading name"
          inputProps={{
            required: true,
            value: soleTraderFormData.tradingName,
            name: 'trading_name',
            onChange: onChange('tradingName'),
          }}
        />
      </WrapperTextField>
      <WrapperTextField>
        <TextFieldComponent
          leftIcon={SearchIcon}
          label="Trading address"
          inputProps={{
            required: true,
            value: soleTraderFormData.tradingAddress,
            name: 'trading_address',
            onChange: onChange('tradingAddress'),
          }}
        />
      </WrapperTextField>
      <WrapperTextField>
        <IndustrySelectionDropdown
          value={soleTraderFormData.industry}
          placeholder="Choose industry"
          label="Industry"
          onChange={onChangeIndustry}
        />
      </WrapperTextField>
      <WrapperTextField>
        <TextFieldComponent
          label="Taxpayer identification number"
          inputProps={{
            value: soleTraderFormData.taxpayerId,
            name: 'utr',
            onChange: onChange('taxpayerId'),
          }}
        />
      </WrapperTextField>
      <WrapperTextField>
        <TextFieldComponent
          label="Business name"
          inputProps={{
            required: true,
            value: soleTraderFormData.businessName,
            name: 'business_name',
            onChange: onChange('businessName'),
          }}
        />
      </WrapperTextField>
      <WrapperTextField>
        <TextFieldComponent
          label="Business address"
          leftIcon={SearchIcon}
          inputProps={{
            required: true,
            value: soleTraderFormData.businessAddress,
            name: 'business_address',
            onChange: onChange('businessAddress'),
          }}
        />
      </WrapperTextField>
      <WrapperTextField>
        <TextFieldComponent
          label="Contact name"
          inputProps={{
            required: true,
            value: soleTraderFormData.contactName,
            name: 'contact_name',
            onChange: onChange('contactName'),
          }}
        />
      </WrapperTextField>
      <WrapperTextField>
        <TextFieldComponent
          label="Email"
          inputProps={{
            required: true,
            value: soleTraderFormData.email,
            name: 'email',
            onChange: onChange('email'),
          }}
        />
      </WrapperTextField>
      <WrapperTextField>
        <PhoneInput
          error={formErrors?.phoneNumber?.[0]}
          required
          label="Phone number"
          onChange={(e) => {
            const newSoleTraderFormData = {
              ...soleTraderFormData,
              phoneNumber: e.target.value,
            };
            setSoleTraderFormData(newSoleTraderFormData);
            runValidation(addNewMerchantSchema, newSoleTraderFormData).then(
              (err) => {
                setFormErrors(err);
              }
            );
          }}
        />
      </WrapperTextField>
    </Content>
  );
};

export default AddNewMerchantSoleTraderForm;
