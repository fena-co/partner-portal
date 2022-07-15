import React, { useState } from 'react';
import styled from 'styled-components';
import { Control } from 'react-hook-form';
import DropdownFormField from '../../components/DropdownFormField';
import PhoneFormField from '../../components/PhoneFormField';
import TextFormField from '../../components/TextFormField';
import { industries } from '../../constant/industries';
import SearchIcon from 'image/icon/search-blue.svg';
import CheckBox from '../../components/Checkbox';

const StyledDropdownFormField = styled(DropdownFormField)`
  padding-top: 20px;
`;

const StyledPhoneFormField = styled(PhoneFormField)`
  padding-top: 20px;
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

  const [isDirector, setIsDirector] = useState(false);

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
        name="limitedCompany.registeredAddress"
        control={control}
        leftIcon={SearchIcon}
        required
        label="Registered address"
      />
      <StyledDropdownFormField
        name="limitedCompany.industry"
        control={control}
        placeholder="Choose industry"
        label="Industry"
        items={industriesItems}
      />

      <TextFormField
        name="limitedCompany.tradingName"
        control={control}
        label="Trading name"
      />

      <TextFormField
        name="limitedCompany.tradingAddress"
        control={control}
        label="Trading address"
        leftIcon={SearchIcon}
      />
      <TextFormField
        name="limitedCompany.registrationNumber"
        control={control}
        label="Registration number"
      />
      <TextFormField
        name="limitedCompany.primaryContactName"
        control={control}
        label="Primary contact name"
      />
      <TextFormField name="limitedCompany.email" control={control} label="Email" />
      <StyledPhoneFormField
        name="limitedCompany.phoneNumber"
        control={control}
        label="Phone number"
      />
      <WrapperCheckbox>
        <CheckBox
          label="This is a director"
          onClick={() => setIsDirector(!isDirector)}
          checked={isDirector}
        />
      </WrapperCheckbox>

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
  );
};

export default AddNewMerchantLimitedCompanyForm;
