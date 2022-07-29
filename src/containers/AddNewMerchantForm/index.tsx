import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
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
import { CompanyTypes } from '@fena/types';
import Api from '../../util/api';

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
    tradingAddress: {
      addressLine1: string;
      addressLine2: string;
      city: string;
      zipCode: string;
    };
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
    sendEmail: boolean;
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
    address: {
      addressLine1: string;
      addressLine2: string;
      city: string;
      zipCode: string;
    };
    tradingAddress: {
      addressLine1: string;
      addressLine2: string;
      city: string;
      zipCode: string;
    };
    registrationNumber: string;
    primaryContactName: string;
    email: string;
    phoneNumber: {
      code: string;
      number: string;
    };
    isDirector: boolean;
    sendEmail: boolean;
    sameAsRegisteredName: boolean;
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
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      zipCode: '',
    },
    industry: { label: '', value: '' },
    contactName: '',
    email: '',
    phoneNumber: {
      code: 'GB',
      number: '',
    },
    publicWebsite: 'http://',
    sendEmail: false,
  },
  limitedCompany: {
    crn: '',
    registeredName: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      zipCode: '',
    },
    industry: {
      label: '',
      value: '',
    },
    tradingName: '',
    tradingAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      zipCode: '',
    },
    registrationNumber: '',
    primaryContactName: '',
    email: '',
    phoneNumber: {
      code: 'GB',
      number: '',
    },
    publicWebsite: 'http://',
    isDirector: true,
    sendEmail: false,
    sameAsRegisteredName: false,
    directorContactName: '',
    directorEmail: '',
    directorPhoneNumber: {
      code: 'GB',
      number: '',
    },
  },
};

interface AddMerchantFormProps {
  setSuccess: (email: string) => void;
}

const AddNewMerchantForm: NextPage<AddMerchantFormProps> = ({ setSuccess }) => {
  const [sameAsRegisteredName, setSameAsRegisteredName] = useState(false);
  const [sameAsRegisteredAddress, setSameAsRegisteredAddress] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddMerchantValues>({
    defaultValues: addMerchantDefaultValues,
    mode: 'onChange',
    resolver: yupResolver(addMerchantSchema),
  });

  const countryData = watch('country');

  const businessType = watch('businessType');

  const bankDetailsType = watch('bankDetailsType');

  const isDirector = watch('limitedCompany.isDirector');

  const isEmailSend = watch('limitedCompany.sendEmail');

  const isSoleEmailSend = watch('soleTrader.sendEmail');

  const crn = watch('limitedCompany.crn');

  const registeredName = watch('limitedCompany.registeredName');

  const limitedCompany = watch('limitedCompany');

  const limitedRegAddress = watch('limitedCompany.address');

  useEffect(() => {
    findCompaniesHouseData(crn);
  }, [crn]);

  const onSameAsRegisteredNameChange = () => {
    setSameAsRegisteredName(!sameAsRegisteredName);
    if (!sameAsRegisteredName) {
      setValue<any>('limitedCompany', {
        ...limitedCompany,
        tradingName: registeredName,
      });
    } else {
      setValue<any>('limitedCompany', {
        ...limitedCompany,
        tradingName: '',
      });
    }
  };

  const onSameAsRegisteredAddressChange = () => {
    setSameAsRegisteredAddress(!sameAsRegisteredAddress);
    if (!sameAsRegisteredAddress) {
      setValue<any>('limitedCompany', {
        ...limitedCompany,
        tradingAddress: limitedRegAddress,
      });
    } else {
      setValue<any>('limitedCompany', {
        ...limitedCompany,
        tradingAddress: {
          addressLine1: '',
          addressLine2: '',
          city: '',
          zipCode: '',
        },
      });
    }
  };

  const findCompaniesHouseData = async (crn: string) => {
    const chResult = await Api.getCompaniesHouseData(crn);
    const officeAddress = chResult?.registered_office_address;
    setValue<any>('limitedCompany', {
      ...limitedCompany,
      registeredName: chResult?.company_name,
      address: {
        addressLine1: officeAddress?.address_line_1,
        addressLine2: officeAddress?.address_line_2,
        city: officeAddress?.locality,
        zipCode: officeAddress?.postal_code,
      },
    });
    console.log('reqResult', chResult);
  };

  const mappedCountryCodes = COUNTRY_CODES.map((el) => ({
    label: el.countryName,
    value: el.country,
  }));

  const onSubmit = async (data: any) => {
    console.log('submittedData', data);
    const {
      isDirector,
      businessType,
      soleTrader,
      limitedCompany,
      provider,
      country,
      name,
      identification,
      externalAccountId,
    } = data;
    console.log('chosenType', businessType.value);
    if (businessType.value === 'individual') {
      console.log('individ');
      const individualApiRes = await Api.createMerchant({
        sendEmail: soleTrader.sendEmail,
        type: CompanyTypes.SOLE_TRADER,
        name: soleTrader.tradingName,
        contactName: soleTrader.contactName,
        countryCode: country.value,
        identifier: soleTrader.utr,
        address: {
          addressLine1: soleTrader.address?.addressLine1,
          addressLine2: soleTrader.address?.addressLine2,
          city: soleTrader.address?.city,
          zipCode: soleTrader.address?.zipCode,
          country: country.label,
        },
        industry: soleTrader.industry.value,
        publicEmail: soleTrader.email,
        supportPhone: `${soleTrader.phoneNumber.code} ${soleTrader.phoneNumber.number}`,
        publicWebsite: soleTrader.publicWebsite,
        bankAccount: {
          provider: provider.value,
          name: name,
          identification: identification?.replace(/-/g, ''),
          externalAccountId: externalAccountId,
        },
      });
      setSuccess(soleTrader.email);
      console.log(individualApiRes);
    } else {
      console.log('limited');
      const limitedApiRes = await Api.createMerchant({
        sendEmail: limitedCompany.sendEmail,
        type: CompanyTypes.COMPANY,
        countryCode: country.value,
        contactName: limitedCompany.primaryContactName,
        identifier: limitedCompany.crn,
        name: limitedCompany.registeredName,
        tradingName: limitedCompany.tradingName,
        address: {
          addressLine1: limitedCompany.address?.addressLine1,
          addressLine2: limitedCompany.address?.addressLine2,
          city: limitedCompany.address?.city,
          zipCode: limitedCompany.address?.zipCode,
          country: country.label,
        },
        tradingAddress: {
          addressLine1: limitedCompany.tradingAddress?.addressLine1,
          addressLine2: limitedCompany.tradingAddress?.addressLine2,
          city: limitedCompany.tradingAddress?.city,
          zipCode: limitedCompany.tradingAddress?.zipCode,
          country: country.label,
        },
        industry: limitedCompany.industry.value,
        publicEmail: limitedCompany.email,

        supportPhone: `${limitedCompany.phoneNumber.code} ${limitedCompany.phoneNumber.number}`,
        publicWebsite: limitedCompany.publicWebsite,
        // directorsInfo: {
        //   email: isDirector
        //     ? limitedCompany.email
        //     : limitedCompany.directorEmail,
        //   name: isDirector
        //     ? limitedCompany.primaryContactName
        //     : limitedCompany.directorContactName,
        //   phone: isDirector
        //     ? `${limitedCompany.phoneNumber.code} ${limitedCompany.phoneNumber.number}`
        //     : `${limitedCompany.directorPhoneNumber.code} ${limitedCompany.directorPhoneNumber.number}`,
        // },
        bankAccount: {
          provider: provider.value,
          name: name,
          identification: identification?.replace(/-/g, ''),
          externalAccountId: externalAccountId,
        },
      });
      setSuccess(limitedCompany.email);
      console.log(limitedApiRes);
    }
  };

  return (
    <>
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
          withoutSearch
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
                isEmailSend={isSoleEmailSend}
                countryData={countryData}
                control={control as any}
              />
            )}
            {businessType.value === 'limited' && (
              <AddNewMerchantLimitedCompanyForm
                onSameAsRegisteredNameChange={onSameAsRegisteredNameChange}
                onSameAsRegisteredAddressChange={
                  onSameAsRegisteredAddressChange
                }
                sameAsRegisteredAddress={sameAsRegisteredAddress}
                sameAsRegisteredName={sameAsRegisteredName}
                isEmailSend={isEmailSend}
                isDirector={isDirector}
                countryData={countryData}
                control={control as any}
              />
            )}
            <AddBankAccountForm
              control={control as any}
              renderType={bankDetailsType}
            />
            <ButtonWrapper>
              <ButtonWithChildren
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0 });
                }}
                type="submit"
                variant="contained"
              >
                ADD
              </ButtonWithChildren>
            </ButtonWrapper>
          </>
        )}
      </form>
    </>
  );
};

export default AddNewMerchantForm;
