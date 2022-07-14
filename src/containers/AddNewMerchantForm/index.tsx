import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import Typography from '../../components/Typography';
import ButtonWithChildren from '../../components/Button';
import AddNewMerchantSoleTraderForm from '../AddNewMerchantSoleTraderForm';
import AddNewMerchantLimitedCompanyForm from '../AddNewMerchantLimitedCompanyForm';
import AddBankAccountForm from '../AddBankAccountForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DropdownFormField from '../../components/DropdownFormField';
import { COUNTRY_CODES } from '../../constant/countries';

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const businessInfoSchema = {
  country: yup.object({
    label: yup.string(),
    value: yup.string(),
  }),
  businessType: yup.object({
    label: yup.string(),
    value: yup.string(),
  }),
};

const addBankAccountSchema = {
  accountProvider: yup.string(),
  // coming
};

const soleTraderSchema = yup.object({
  ...businessInfoSchema,
  ...addBankAccountSchema,
  utr: yup
    .string()
    .matches(/^[0-9]*$/, 'UTR cannot include letters')
    .nullable()
    .transform((o, c) => (o === '' ? null : c))
    .min(10, 'Enter valid UTR')
    .max(10, 'Enter valid UTR'),
  tradingName: yup.string().required('This field is required'),
  tradingAddress: yup.string().required('This field is required'),
  industry: yup.object({
    label: yup.string(),
    value: yup.string(),
  }),
  businessName: yup.string().required('This field is required'),
  businessAddress: yup.string().required('This field is required'),
  contactName: yup.string().required('This field is required'),
  email: yup
    .string()
    .required('This field is required')
    .email('Email must be valid'),
  phoneNumber: yup.object({
    code: yup.string().required(),
    number: yup
      .string()
      .required('This field is required')
      .matches(/^[0-9]+$/, 'Phone number is not valid')
      .matches(/^0?\d{0,10}$/, 'Phone number length exceeded'),
  }),
  // identification: yup.string().min(6, 'Sort code must be 6 digits'),
  // externalAccountId: yup.string().min(8, 'Account number must be 8 digits'),
});

const limitedCompanySchema = yup.object({
  ...businessInfoSchema,
  ...addBankAccountSchema,
});

const addMerchantSchema = yup.lazy((values) => {
  if (values.businessType.value === 'limited') {
    return limitedCompanySchema;
  } else if (values.businessType.value === 'individual') {
    return soleTraderSchema
  } else {
    return yup.object()
  }
})

interface BusinessInfoValues {
  businessType: { label: string; value: string };
  country: { label: string; value: string };
}

interface BankAccountValues extends BusinessInfoValues {}

interface SoleTraderValues extends BankAccountValues {
  utr: string;
  tradingName: string;
  tradingAddress: string;
  businessName: string;
  businessAddress: string;
  contactName: string;
  email: string;
  industry: {
    label: string;
    value: string;
  };
  taxpayerId: string;
  phoneNumber: {
    code: string;
    number: string;
  };
}

interface LimitedCompanyValues extends BankAccountValues {
  // coming
}

type AddMerchantValues = SoleTraderValues | LimitedCompanyValues;

const soleTraderDefaultValues = {
  country: { label: '', value: '' },
  businessType: { label: '', value: '' },
  utr: '',
  tradingName: '',
  tradingAddress: '',
  businessName: '',
  businessAddress: '',
  contactName: '',
  email: '',
  industry: { label: '', value: '' },
  phoneNumber: {
    code: 'GB',
    number: '',
  },
};

const AddNewMerchantForm: NextPage = () => {
  const { handleSubmit, control, watch } = useForm<AddMerchantValues>({
    defaultValues: soleTraderDefaultValues,
    mode: 'onChange',
    resolver: yupResolver(addMerchantSchema),
  });

  const countryData = watch('country');

  const businessType = watch('businessType');

  // console.log('getVals', getValues());

  // const { businessType, country: countryData } = getValues();

  // const [countryData, setCountry] = useState<{
  //   country?: string;
  //   countryName?: string;
  // }>({});

  const mappedCountryCodes = COUNTRY_CODES.map((el) => ({
    label: el.countryName,
    value: el.country,
  }));

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Content>
      <Title variant="subtitle4">Add new merchant</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DropdownFormField
          required
          withCountryFlags
          name="country"
          control={control as any}
          placeholder="Choose country"
          label="Registration country"
          items={mappedCountryCodes}
        />
        <DropdownFormField
          required
          name="businessType"
          control={control as any}
          placeholder="Choose industry"
          label="Business structure"
          items={businessTypeItems}
        />
        {/* <WrapperTextField>
          <CountrySelectionDropdown
            required
            value={countryData.countryName}
            label="Registration country"
            onChange={setCountry}
            placeholder="Select your country..."
          />
        </WrapperTextField>
        <WrapperTextField>
          <SelectDropDown
            label="Business structure"
            required
            value={businessType ? businessTypes[businessType] : null}
            placeholder="Choose your business structure"
            fullWidth
          >
            <MenuItem onClick={onBusinessTypeChange('limited')}>
              Limited Company
            </MenuItem>
            <MenuItem onClick={onBusinessTypeChange('individual')}>
              Sole Trader / Individual
            </MenuItem>
          </SelectDropDown>
        </WrapperTextField> */}
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
            <AddBankAccountForm control={control as any} />
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
