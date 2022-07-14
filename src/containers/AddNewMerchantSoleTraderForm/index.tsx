import React from 'react';
import styled from 'styled-components';
import DropdownFormField from '../../components/DropdownFormField';
import Form from '../../components/Form';
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
}

const AddNewMerchantSoleTraderForm: React.FunctionComponent<
  AddNewMerchantSoleTraderFormProps
> = ({ countryData: { country } }) => {
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
        required={country !== 'GB'}
        label={
          country !== 'GB'
            ? 'Taxpayer identification number'
            : 'Unique Taxpayer Reference (UTR)'
        }
      />
      <TextFormField name="tradingName" required label="Trading name" />
      <TextFormField
        leftIcon={SearchIcon}
        name="tradingAddress"
        required
        label="Trading address"
      />
      <StyledDropdownFormField
        name="industry"
        placeholder="Choose industry"
        label="Industry"
        items={industriesItems}
      />

      <TextFormField name="taxpayerId" label="Taxpayer identification number" />

      <TextFormField name="businessName" required label="Business name" />
      <TextFormField
        leftIcon={SearchIcon}
        name="businessAddress"
        required
        label="Business address"
      />
      <TextFormField name="contactName" required label="Contact name" />
      <TextFormField name="email" required label="Email" />
      <StyledPhoneFormField required name="phoneNumber" label="Phone number" />
      <button type="submit">done</button>
    </>
  );
};

export default AddNewMerchantSoleTraderForm;
