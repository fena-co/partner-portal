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
  countryData?: {
    label: string;
    value: string;
  };
  control: Control;
}

const AddNewMerchantLimitedCompanyForm: React.FunctionComponent<
  AddNewMerchantSoleTraderFormProps
> = ({ countryData, control }) => {
  const { value: countryCode } = countryData || {};
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
        name="crn"
        control={control}
        label={
          countryCode !== 'GB'
            ? 'Registration number'
            : 'Company registration number'
        }
      />
      <TextFormField
        name="registeredName"
        control={control}
        required
        label="Registered name"
      />
      <TextFormField
        name="registeredAddress"
        control={control}
        leftIcon={SearchIcon}
        required
        label="Registered address"
      />
      <StyledDropdownFormField
        name="industry"
        control={control}
        placeholder="Choose industry"
        label="Industry"
        items={industriesItems}
      />

      <TextFormField
        name="tradingName"
        control={control}
        label="Trading name"
      />

      <TextFormField
        name="tradingAddress"
        control={control}
        required
        label="Trading address"
        leftIcon={SearchIcon}
      />
      <TextFormField
        name="businessAddress"
        control={control}
        required
        label="Business address"
      />
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

export default AddNewMerchantLimitedCompanyForm;
