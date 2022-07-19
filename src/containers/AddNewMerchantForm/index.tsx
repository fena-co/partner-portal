import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import Typography from '../../components/Typography';
import ButtonWithChildren from '../../components/Button';
import AddNewMerchantSoleTraderForm from '../AddNewMerchantSoleTraderForm';
import AddNewMerchantLimitedCompanyForm from '../AddNewMerchantLimitedCompanyForm';
import AddBankAccountForm from '../AddBankAccountForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DropdownFormField from '../../components/DropdownFormField';
import { COUNTRY_CODES } from '../../constant/countries';
import { addMerchantSchema } from './validation';

const businessTypeItems = [
  { label: 'Sole Trader / Individual', value: 'individual' },
  { label: 'Limited Company', value: 'limited' },
];

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

const StyledDropdownFormField = styled(DropdownFormField)`
  padding-top: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

interface BusinessInfoValues extends BankDetailsTypeValues {
  businessType: { label: string; value: string };
  country: { label: string; value: string };
}

interface BankDetailsTypeValues {
  bankDetailsType: string;
}

interface BankAccountValues extends BusinessInfoValues {
  provider: {
    label: string;
    value: string;
  };
  name: string;
  identification: string;
  externalAccountId: string;
}

interface SoleTraderValues extends BankAccountValues {
  soleTrader: {
    utr: string;
    tradingName: string;
    tradingAddress: string;
    contactName: string;
    email: string;
    industry: {
      label: string;
      value: string;
    };
    phoneNumber: {
      code: string;
      number: string;
    };
  };
}

interface LimitedCompanyValues extends BankAccountValues {
  limitedCompany: {
    crn: string;
    registeredName: string;
    registeredAddress: string;
    industry: {
      label: string;
      value: string;
    };
    tradingName: string;
    tradingAddress: string;
    registrationNumber: string;
    primaryContactName: string;
    email: string;
    phoneNumber: {
      code: string;
      number: string;
    };
    directorContactName: string;
    directorEmail: string;
    directorPhoneNumber: {
      code: string;
      number: string;
    };
  };
}

type AddMerchantValues = SoleTraderValues | LimitedCompanyValues;

const addMerchantDefaultValues = {
  country: { label: '', value: '' },
  businessType: { label: '', value: '' },
  bankDetailsType: 'manual',
  soleTrader: {
    utr: '',
    tradingName: '',
    tradingAddress: '',
    industry: { label: '', value: '' },
    contactName: '',
    email: '',
    phoneNumber: {
      code: 'GB',
      number: '',
    },
  },
  limitedCompany: {
    crn: '',
    registeredName: '',
    registeredAddress: '',
    industry: {
      label: '',
      value: '',
    },
    tradingName: '',
    tradingAddress: '',
    registrationNumber: '',
    primaryContactName: '',
    email: '',
    phoneNumber: {
      code: 'GB',
      number: '',
    },
    directorContactName: '',
    directorEmail: '',
    directorPhoneNumber: {
      code: '',
      number: '',
    },
  },
};

const AddNewMerchantForm: NextPage = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<AddMerchantValues>({
    defaultValues: addMerchantDefaultValues,
    mode: 'onChange',
    resolver: yupResolver(addMerchantSchema),
  });

  const countryData = watch('country');

  const businessType = watch('businessType');

  const bankDetailsType = watch('bankDetailsType');

  const mappedCountryCodes = COUNTRY_CODES.map((el) => ({
    label: el.countryName,
    value: el.country,
  }));

  const onSubmit = (data: any) => {
    console.log('submittedData', data);
  };

  return (
    <Content>
      <Title variant="subtitle4">Add new merchant</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledDropdownFormField
          required
          withCountryFlags
          name="country"
          control={control as any}
          placeholder="Choose country"
          label="Registration country"
          items={mappedCountryCodes}
        />
        <StyledDropdownFormField
          required
          name="businessType"
          control={control as any}
          placeholder="Choose industry"
          label="Business structure"
          items={businessTypeItems}
        />

        {countryData?.value && businessType?.value && (
          <>
            {businessType.value === 'individual' && (
              <AddNewMerchantSoleTraderForm
                countryData={countryData}
                control={control as any}
              />
            )}
            {businessType.value === 'limited' && (
              <AddNewMerchantLimitedCompanyForm
                countryData={countryData}
                control={control as any}
              />
            )}
            <AddBankAccountForm
              control={control as any}
              renderType={bankDetailsType}
            />
            <ButtonWrapper>
              <ButtonWithChildren type="submit" variant="contained">
                ADD
              </ButtonWithChildren>
            </ButtonWrapper>
          </>
        )}
      </form>
    </Content>
  );
};

export default AddNewMerchantForm;
