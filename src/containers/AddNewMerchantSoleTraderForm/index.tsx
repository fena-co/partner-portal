import React from 'react';
import styled from 'styled-components';
import { Control } from 'react-hook-form';
import DropdownFormField from '../../components/DropdownFormField';
import PhoneFormField from '../../components/PhoneFormField';
import TextFormField from '../../components/TextFormField';
import { industries } from '../../constant/industries';
import Typography from '../../components/Typography';
import CheckboxFormField from '../../components/CheckboxFormField';

const StyledDropdownFormField = styled(DropdownFormField)`
  padding-top: 20px;
`;

const StyledPhoneFormField = styled(PhoneFormField)`
  padding-top: 20px;
`;

const SectionLabel = styled(Typography)`
  margin-top: 20px;
`;

const WrapperCheckbox = styled.div`
  padding-top: 20px;
`;

interface AddNewMerchantSoleTraderFormProps {
  countryData?: {
    label: string;
    value: string;
  };
  control: Control;
  isEmailSend: boolean;
}

const AddNewMerchantSoleTraderForm: React.FunctionComponent<
  AddNewMerchantSoleTraderFormProps
> = ({ countryData, control, isEmailSend }) => {
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
      <StyledDropdownFormField
        name="soleTrader.industry"
        control={control}
        placeholder="Choose industry"
        label="Industry"
        required
        items={industriesItems}
      />
      <TextFormField
        name="soleTrader.contactName"
        control={control}
        required
        label="Full legal name"
      />
      <TextFormField
        name="soleTrader.email"
        control={control}
        required
        label="Contact email"
      />
      <StyledPhoneFormField
        required
        name="soleTrader.phoneNumber"
        control={control}
        label="Contact phone number"
      />
      <TextFormField
        name="soleTrader.publicWebsite"
        control={control}
        label="Business website"
      />
      <TextFormField
        name="soleTrader.tradingName"
        control={control}
        required
        label="Trading name"
      />
      <SectionLabel variant="subtitle5">Address</SectionLabel>
      <TextFormField
        name="soleTrader.address.addressLine1"
        control={control}
        required
        label="Address line 1"
      />
      <TextFormField
        name="soleTrader.address.addressLine2"
        control={control}
        label="Address line 2"
      />
      <TextFormField
        name="soleTrader.address.city"
        control={control}
        required
        label="City"
      />
      <TextFormField
        name="soleTrader.address.zipCode"
        control={control}
        required
        label="Postcode"
      />
      <WrapperCheckbox>
        <CheckboxFormField
          name="soleTrader.sendEmail"
          control={control}
          label="Send email for ID verification"
          checked={isEmailSend}
        />
      </WrapperCheckbox>
    </>
  );
};

export default AddNewMerchantSoleTraderForm;
