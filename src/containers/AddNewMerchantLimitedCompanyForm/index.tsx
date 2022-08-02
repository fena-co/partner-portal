import React, { FocusEventHandler } from 'react';
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

const WrapperCheckbox = styled.div`
  padding-top: 20px;
`;

const WrapperSameCheckbox = styled.div`
  padding-top: 10px;
`;

const SectionLabel = styled(Typography)`
  margin-top: 20px;
`;

interface AddNewMerchantSoleTraderFormProps {
  countryData?: {
    label: string;
    value: string;
  };
  onSameAsRegisteredNameChange: () => void;
  onSameAsRegisteredAddressChange: () => void;
  onFocus: FocusEventHandler<HTMLInputElement>;
  control: Control;
  isDirector: boolean;
  isEmailSend: boolean;
  sameAsRegisteredName: boolean;
  sameAsRegisteredAddress: boolean;
}

const AddNewMerchantLimitedCompanyForm: React.FunctionComponent<
  AddNewMerchantSoleTraderFormProps
> = ({
  onSameAsRegisteredNameChange,
  onSameAsRegisteredAddressChange,
  countryData,
  control,
  isDirector,
  isEmailSend,
  sameAsRegisteredName,
  sameAsRegisteredAddress,
  onFocus,
}) => {
  const { value: countryCode } = countryData || {};
  const industriesItems = industries.map((el) => ({
    label: el.category,
    items: el.specifics.map((elem) => ({
      label: elem,
      value: el.category,
    })),
  }));

  return (
    <>
      <TextFormField
        name="limitedCompany.crn"
        control={control}
        required
        label={
          countryCode !== 'GB'
            ? 'Registration number'
            : 'Company registration number (CRN)'
        }
      />
      <TextFormField
        name="limitedCompany.registeredName"
        control={control}
        required
        label="Registered name"
      />
      <TextFormField
        name="limitedCompany.tradingName"
        control={control}
        label="Trading name"
      />
      <WrapperSameCheckbox>
        <CheckboxFormField
          name=""
          control={control}
          label="Same as registered"
          onChange={() => {
            onSameAsRegisteredNameChange();
          }}
          checked={sameAsRegisteredName}
        />
      </WrapperSameCheckbox>
      <SectionLabel variant="subtitle5">Registered address</SectionLabel>
      <TextFormField
        name="limitedCompany.address.addressLine1"
        control={control}
        required
        label="Address line 1"
      />
      <TextFormField
        name="limitedCompany.address.addressLine2"
        control={control}
        label="Address line 2"
      />
      <TextFormField
        name="limitedCompany.address.city"
        control={control}
        required
        label="City"
      />
      <TextFormField
        name="limitedCompany.address.zipCode"
        control={control}
        required
        label="Postcode"
      />
      <SectionLabel variant="subtitle5">Trading address</SectionLabel>
      <TextFormField
        name="limitedCompany.tradingAddress.addressLine1"
        control={control}
        required
        label="Address line 1"
      />
      <WrapperSameCheckbox>
        <CheckboxFormField
          name=""
          control={control}
          label="Same as registered"
          onChange={() => {
            onSameAsRegisteredAddressChange();
          }}
          checked={sameAsRegisteredAddress}
        />
      </WrapperSameCheckbox>
      <TextFormField
        name="limitedCompany.tradingAddress.addressLine2"
        control={control}
        label="Address line 2"
      />
      <TextFormField
        name="limitedCompany.tradingAddress.city"
        control={control}
        label="City"
        required
      />
      <TextFormField
        name="limitedCompany.tradingAddress.zipCode"
        control={control}
        label="Postcode"
        required
      />
      <StyledDropdownFormField
        name="limitedCompany.industry"
        control={control}
        placeholder="Choose industry"
        label="Industry"
        required
        items={industriesItems}
      />
      <TextFormField
        name="limitedCompany.publicWebsite"
        control={control}
        onFocus={onFocus}
        label="Business website"
      />
      {/* <TextFormField
        name="limitedCompany.registrationNumber"
        control={control}
        label="Registration number"
      /> */}
      <TextFormField
        name="limitedCompany.primaryContactName"
        control={control}
        label="Primary contact name"
        required={isDirector}
      />
      <TextFormField
        name="limitedCompany.email"
        control={control}
        label="Primary contact email"
        required={isDirector}
      />
      <StyledPhoneFormField
        name="limitedCompany.phoneNumber"
        control={control}
        label="Primary phone number"
        required={isDirector}
      />

      {/* <WrapperCheckbox>
        <CheckboxFormField
          name="limitedCompany.isDirector"
          control={control}
          label="This is a director"
          checked={isDirector}
        />
      </WrapperCheckbox>
      {!isDirector && (
        <>
          <TextFormField
            required
            name="limitedCompany.directorContactName"
            control={control}
            label="Director's contact name"
          />
          <TextFormField
            required
            name="limitedCompany.directorEmail"
            control={control}
            label="Director's email"
          />
          <StyledPhoneFormField
            required
            name="limitedCompany.directorPhoneNumber"
            control={control}
            label="Director's phone number"
          />
        </>
      )} */}
      <WrapperCheckbox>
        <CheckboxFormField
          name="limitedCompany.sendEmail"
          control={control}
          label="Send email for ID verification"
          checked={isEmailSend}
        />
      </WrapperCheckbox>
    </>
  );
};

export default AddNewMerchantLimitedCompanyForm;
