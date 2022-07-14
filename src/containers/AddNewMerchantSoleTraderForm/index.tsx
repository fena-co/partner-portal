import React from 'react';
import styled from 'styled-components';
import { Control } from 'react-hook-form';
import DropdownFormField from '../../components/DropdownFormField';
import PhoneFormField from '../../components/PhoneFormField';
import TextFormField from '../../components/TextFormField';
import { industries } from '../../constant/industries';
import SearchIcon from 'image/icon/search-blue.svg';

const StyledDropdownFormField = styled(DropdownFormField)`
  padding-top: 20px;
`;

const StyledPhoneFormField = styled(PhoneFormField)`
  padding-top: 20px;
`;

interface AddNewMerchantSoleTraderFormProps {
  countryData: {
    country?: string;
    countryName?: string;
  };
  control: Control;
}

const AddNewMerchantSoleTraderForm: React.FunctionComponent<
  AddNewMerchantSoleTraderFormProps
> = ({ countryData: { country }, control }) => {
  const industriesItems = industries.map((el) => ({
    label: el.category,
    items: el.specifics.map((elem) => ({
      label: elem,
      value: elem,
    })),
  }));

  return (
    <>
      <TextFormField
        name="utr"
        control={control}
        required={country !== 'GB'}
        label={
          country !== 'GB'
            ? 'Taxpayer identification number (TIN)'
            : 'Unique Taxpayer Reference (UTR)'
        }
      />
      <TextFormField
        name="tradingName"
        control={control}
        required
        label="Trading name"
      />
      <TextFormField
        name="tradingAddress"
        control={control}
        leftIcon={SearchIcon}
        required
        label="Trading address"
      />
      <StyledDropdownFormField
        name="industry"
        control={control}
        placeholder="Choose industry"
        label="Industry"
        items={industriesItems}
      />
      {country === 'GB' && (
        <>
          <TextFormField
            name="businessName"
            control={control}
            required
            label="Business name"
          />
          <TextFormField
            name="businessAddress"
            control={control}
            leftIcon={SearchIcon}
            required
            label="Business address"
          />
        </>
      )}
      <TextFormField
        name="contactName"
        control={control}
        required
        label="Contact name"
      />
      <TextFormField name="email" control={control} required label="Email" />
      <StyledPhoneFormField
        required
        name="phoneNumber"
        control={control}
        label="Phone number"
      />
    </>
  );
};

export default AddNewMerchantSoleTraderForm;
