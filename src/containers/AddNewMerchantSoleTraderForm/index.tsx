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

const AddNewMerchantSoleTraderForm: React.FunctionComponent<
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
        name="soleTrader.utr"
        control={control}
        required={countryCode !== 'GB'}
        label={
          countryCode !== 'GB'
            ? 'Taxpayer identification number (TIN)'
            : 'Unique Taxpayer Reference (UTR)'
        }
      />
      <TextFormField
        name="soleTrader.tradingName"
        control={control}
        required
        label="Trading name"
      />
      <TextFormField
        name="soleTrader.tradingAddress"
        control={control}
        leftIcon={SearchIcon}
        required
        label="Trading address"
      />
      <StyledDropdownFormField
        name="soleTrader.industry"
        control={control}
        placeholder="Choose industry"
        label="Industry"
        items={industriesItems}
      />
      <TextFormField
        name="soleTrader.contactName"
        control={control}
        required
        label="Contact name"
      />
      <TextFormField name="soleTrader.email" control={control} required label="Email" />
      <StyledPhoneFormField
        required
        name="soleTrader.phoneNumber"
        control={control}
        label="Phone number"
      />
    </>
  );
};

export default AddNewMerchantSoleTraderForm;
