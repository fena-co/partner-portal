import { NextPage } from 'next';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import CountrySelectionDropdown from '../../components/CountrySelectionDropdown';
import SelectDropDown from '../../components/SelectDropDown';
import TextFieldComponent from '../../components/Textfield';
import Typography from '../../components/Typography';
import { COUNTRY_CODES } from '../../constant/countries';
import { CompanyTypes } from '../../types/api';
import * as yup from 'yup';
import { runValidation } from '../../util/formValidation';
import IndustrySelectionDropdown from '../../components/Dropdown';
import SearchIcon from 'image/icon/search-blue.svg';
import PhoneInput from '../../components/PhoneInput';
import ProviderSelectionDropdown from '../../components/ProviderSelectionDropdown';
import ShareVerificationLink from '../../components/ShareVerificationLink';
import ButtonWithChildren from '../../components/Button';
import CheckBox from '../../components/Checkbox';
import { useForm } from 'react-hook-form';

const limitedCompanySchema = yup.object().shape({
  crn: yup
    .string()
    .min(8, 'Enter valid CRN')
    .max(8, 'Enter valid CRN')
    .matches(/[a-zA-Z]{2}[0-9]{6}|[0-9]{8}/, 'Enter valid CRN'),
  phoneNumber: yup
    .string()
    .matches(/[0-9]+/, 'Phone number is not valid')
    .matches(/\w{2} 0?\d{0,10}$/, 'Phone number length exceeded'),
  identification: yup.string().min(6, 'Sort code must be 6 digits'),
  externalAccountId: yup.string().min(8, 'Account number must be 8 digits'),
})

const businessTypes = {
  individual: 'Sole Trader / Individual',
  limited: 'Limited Company',
};

const company: any = {
  countryName: 'United Kingdom',
  code: '+44',
  country: 'GB',
  identifier: '',
  tradingName: '',
  tradingAddress: '',
  industry: '',
};

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

const WrapperTextField = styled.div`
  margin-top: 10px;
  &:first-child {
    margin-top: 0px;
  }
`;

const WrapperCheckBox = styled.div`
  margin-top: 30px;
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

const ConnectBankAccount = styled.div``;

const ShareWrapper = styled.div`
  margin-top: 30px;
`;

const Banner = styled.div`
  padding: 15px;
  margin-top: 30px;
  background-color: rgba(44, 209, 158, 0.05);
  border-radius: 5px;
  border: 1px solid rgba(44, 209, 158, 0.4);
`;

const Email = styled.a`
  color: #38b6ff;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const RadioInput = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
`;

const RadioButton = styled.input`
  accent-color: black;
  margin-right: 10px;
`;

const AddNewMerchantLimitedCompanyForm: NextPage = () => {
  // cool code starts here
  const {} = useForm({
    validationSchema: addNewMerchantSchema,
  });
  // cool code ends here

  const [formErrors, setFormErrors] = useState<any>({});
  const [country, setCountry] = useState<{
    country?: string;
    countryName?: string;
  }>(
    company.countryCode
      ? {
          country: company.countryCode,
          countryName: COUNTRY_CODES.find(
            (c) => c.country === company.countryCode
          )!.countryName,
        }
      : {}
  );

  const [businessType, setBusinessType] = useState<
    keyof typeof businessTypes | undefined
  >(
    company.type
      ? company.type === CompanyTypes.COMPANY
        ? 'limited'
        : 'individual'
      : undefined
  );

  const [limitedFormData, setLimitedFormData] = useState({
    crn: company.identifier || '',
    registeredName: company.name || '',
    registeredAddress: company.address || '',
    industry: company.industry || '',
    tradingName: company.tradingName || '',
    tradingAddress: company.tradingAddress || '',
    registrationNumber: company.registrationNumber || '',
    businessName: company.businessName || '',
    businessAddress: company.businessAddress || '',
    contactName: company.contactName || '',
    email: company.email || '',
    phoneNumber: company.phoneNumber || '',
    directorName: company.directorName || '',
    directorEmail: company.directorEmail || '',
    directorePhoneNumber: company.directorPhoneNumber || '',
  });

  const [soleTraderFormData, setSoleTraderFormData] = useState({
    utr: company.identifier || '',
    tradingName: company.tradingName || '',
    tradingAddress: company.tradingAddress || '',
    businessName: company.businessName || '',
    businessAddress: company.businessAddress || '',
    contactName: company.contactName || '',
    email: company.email || '',
    industry: company.industry || '',
    taxpayerId: company.taxpayerId || '',
  });

  const [bankDetailsType, setBankDetailsType] = useState('manually');

  const [connectBankAccFormData, setConnectBankAccFormData] = useState({
    name: '',
    identification: '',
    externalAccountId: '',
    provider: '',
  });

  const [providers, setProviders] = useState<
    Array<{ name: string; value: string }>
  >([]);

  const [isDirector, setIsDirector] = useState(false);

  // const getProviders = async () => {
  //   const results = await Api.getProviders();
  //   const mapped = results.map((result: any) => ({
  //     name: result.name,
  //     value: result._id,
  //   }));
  //   setProviders(mapped);
  // };

  const onBusinessTypeChange = (type: keyof typeof businessTypes) => () => {
    setBusinessType(type);
  };

  const onChange =
    (key: string) => async (event: ChangeEvent<HTMLInputElement>) => {
      console.log(businessType);
      if (businessType === 'limited') {
        const newValues = { ...limitedFormData, [key]: event.target.value };
        setLimitedFormData(newValues);
        console.log(key, country, event.target.value);
        if (key === 'crn' && country.country === 'GB') {
          runValidation(addNewMerchantSchema, newValues).then((err) => {
            setFormErrors(err);
          });
        }
        if (
          key === 'crn' &&
          country.country === 'GB' &&
          event.target.value.length >= 8
        ) {
        }
      } else {
        const newValues = {
          ...soleTraderFormData,
          [key]: event.target.value,
        };
        setSoleTraderFormData(newValues);
        if (key === 'utr' && country.country === 'GB') {
          runValidation(addNewMerchantSchema, newValues).then((err) => {
            setFormErrors(err);
          });
        }
      }
    };

  const onChangeIndustry = (name: string) => {
    if (businessType === 'limited') {
      setLimitedFormData({ ...limitedFormData, industry: name });
    } else {
      setSoleTraderFormData({ ...soleTraderFormData, industry: name });
    }
  };

  const onProviderChange = (provider: string) => {
    setConnectBankAccFormData({ ...connectBankAccFormData, provider });
  };

  return (
    <Content>
      <Title variant="subtitle4">Add new merchant</Title>
      <WrapperTextField>
        <CountrySelectionDropdown
          value={country ? country.countryName : null}
          required
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
      </WrapperTextField>

      {businessType === 'individual' && country.country && (
        <>
          <WrapperTextField>
            <TextFieldComponent
              error={formErrors?.utr?.[0]}
              label={
                country.country !== 'GB'
                  ? 'Taxpayer identification number'
                  : 'Unique Taxpayer Reference (UTR)'
              }
              inputProps={{
                required: country.country !== 'GB' && true,
                value: soleTraderFormData.utr,
                onChange: onChange('utr'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              label="Trading name"
              inputProps={{
                required: true,
                value: soleTraderFormData.tradingName,
                name: 'trading_name',
                onChange: onChange('tradingName'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              leftIcon={SearchIcon}
              label="Trading address"
              inputProps={{
                required: true,
                value: soleTraderFormData.tradingAddress,
                name: 'trading_address',
                onChange: onChange('tradingAddress'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <IndustrySelectionDropdown
              value={soleTraderFormData.industry}
              placeholder="Choose industry"
              label="Industry"
              onChange={onChangeIndustry}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              label="Taxpayer identification number"
              inputProps={{
                value: soleTraderFormData.taxpayerId,
                name: 'utr',
                onChange: onChange('taxpayerId'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              label="Business name"
              inputProps={{
                required: true,
                value: soleTraderFormData.businessName,
                name: 'business_name',
                onChange: onChange('businessName'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              label="Business address"
              leftIcon={SearchIcon}
              inputProps={{
                required: true,
                value: soleTraderFormData.businessAddress,
                name: 'business_address',
                onChange: onChange('businessAddress'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              label="Contact name"
              inputProps={{
                required: true,
                value: soleTraderFormData.contactName,
                name: 'contact_name',
                onChange: onChange('contactName'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              label="Email"
              inputProps={{
                required: true,
                value: soleTraderFormData.email,
                name: 'email',
                onChange: onChange('email'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <PhoneInput
              error={formErrors?.phoneNumber?.[0]}
              required
              label="Phone number"
              onChange={(e) => {
                const newSoleTraderFormData = {
                  ...soleTraderFormData,
                  phoneNumber: e.target.value,
                };
                setSoleTraderFormData(newSoleTraderFormData);
                runValidation(addNewMerchantSchema, newSoleTraderFormData).then(
                  (err) => {
                    setFormErrors(err);
                  }
                );
              }}
            />
          </WrapperTextField>
        </>
      )}
      {businessType === 'limited' && country.country && (
        <>
          {' '}
          <WrapperTextField>
            <TextFieldComponent
              error={formErrors?.crn?.[0]}
              fullWidth
              label={
                country.country !== 'GB'
                  ? 'Registration number'
                  : 'Company registration number'
              }
              inputProps={{
                required: true,
                value: limitedFormData.crn,
                name: 'company_number',
                placeholder:
                  country.country !== 'GB'
                    ? 'Registration Number *'
                    : 'Company Registration Number (CRN) *',
                onChange: onChange('crn'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              fullWidth
              label={
                country.country !== 'GB' ? 'Business name' : 'Registered name'
              }
              inputProps={{
                required: true,
                value: limitedFormData.registeredName,
                name: 'registered_name',
                placeholder:
                  country.country !== 'GB'
                    ? 'Business name'
                    : 'Registered name',
                onChange: onChange('registeredName'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              fullWidth
              label={
                country.country !== 'GB'
                  ? 'Business address'
                  : 'Registered address'
              }
              inputProps={{
                required: true,
                value: limitedFormData.registeredAddress,
                name: 'registered_name',
                placeholder:
                  country.country !== 'GB'
                    ? 'Business address'
                    : 'Registered address',
                onChange: onChange('registeredName'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <IndustrySelectionDropdown
              value={limitedFormData.industry}
              placeholder="Choose industry"
              label="Industry"
              onChange={onChangeIndustry}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              label="Trading name"
              inputProps={{
                required: true,
                value: limitedFormData.tradingName,
                name: 'trading_name',
                onChange: onChange('tradingName'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              leftIcon={SearchIcon}
              label="Trading address"
              inputProps={{
                required: true,
                value: limitedFormData.tradingAddress,
                name: 'trading_address',
                onChange: onChange('tradingAddress'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              fullWidth
              label="Registration number"
              inputProps={{
                required: true,
                value: limitedFormData.registrationNumber,
                name: 'company_number',
                onChange: onChange('registrationNumber'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              label="Business name"
              inputProps={{
                required: true,
                value: limitedFormData.businessName,
                name: 'business_name',
                onChange: onChange('businessName'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              leftIcon={SearchIcon}
              label="Business address"
              inputProps={{
                required: true,
                value: limitedFormData.businessAddress,
                name: 'business_address',
                onChange: onChange('businessAddress'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              label="Primary contact name"
              inputProps={{
                required: true,
                value: limitedFormData.contactName,
                name: 'contact_name',
                onChange: onChange('contactName'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              label="Email"
              inputProps={{
                required: true,
                value: limitedFormData.email,
                name: 'trading_name',
                onChange: onChange('email'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <PhoneInput
              error={formErrors?.phoneNumber?.[0]}
              required
              label="Phone number"
              onChange={(e) => {
                const newLimitedFormData = {
                  ...limitedFormData,
                  phoneNumber: e.target.value,
                };
                setLimitedFormData(newLimitedFormData);
                runValidation(addNewMerchantSchema, newLimitedFormData).then(
                  (err) => {
                    setFormErrors(err);
                  }
                );
              }}
            />
          </WrapperTextField>
          <WrapperCheckBox>
            <CheckBox
              label="This is a director"
              onClick={() => {
                setIsDirector(!isDirector);
              }}
              checked={isDirector}
            />
          </WrapperCheckBox>
          <WrapperTextField>
            <TextFieldComponent
              label="Director's contact name"
              inputProps={{
                required: true,
                value: limitedFormData.directorName,
                name: 'director_contact_name',
                onChange: onChange('directorName'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <TextFieldComponent
              label="Director's email"
              inputProps={{
                required: true,
                value: limitedFormData.directorEmail,
                name: 'director_email',
                onChange: onChange('directorEmail'),
              }}
            />
          </WrapperTextField>
          <WrapperTextField>
            <PhoneInput
              error={formErrors?.phoneNumber?.[0]}
              required
              label="Director's phone number"
              onChange={(e) => {
                const newLimitedFormData = {
                  ...limitedFormData,
                  directorPhoneNumber: e.target.value,
                };
                setLimitedFormData(newLimitedFormData);
                runValidation(addNewMerchantSchema, newLimitedFormData).then(
                  (err) => {
                    setFormErrors(err);
                  }
                );
              }}
            />
          </WrapperTextField>
        </>
      )}
      {businessType && country.country && (
        <>
          <Title variant="subtitle4">Add bank account</Title>
          <RadioInput>
            <RadioButton
              type="radio"
              checked={bankDetailsType === 'manually'}
              onChange={() => setBankDetailsType('manually')}
            />
            <Typography variant="lightBody">
              Add the details manually
            </Typography>
          </RadioInput>
          <RadioInput>
            <RadioButton
              type="radio"
              checked={bankDetailsType === 'ask'}
              onChange={() => setBankDetailsType('ask')}
            />
            <Typography variant="lightBody">
              Ask merchant to add their bank account using online banking
            </Typography>
          </RadioInput>
          <ConnectBankAccount>
            {bankDetailsType === 'manually' ? (
              <>
                <WrapperTextField>
                  <ProviderSelectionDropdown
                    value={
                      connectBankAccFormData.provider
                        ? providers.find(
                            (p) => p.value === connectBankAccFormData.provider
                          )?.name
                        : null
                    }
                    label="Account provider"
                    placeholder="Choose your account provider"
                    providers={providers.sort(function (a, b) {
                      if (a.name < b.name) {
                        return -1;
                      }
                      if (a.name > b.name) {
                        return 1;
                      }
                      return 0;
                    })}
                    onProviderChange={onProviderChange}
                  />
                </WrapperTextField>
                <WrapperTextField>
                  <TextFieldComponent
                    label="Account name"
                    inputProps={{
                      value: connectBankAccFormData.name,
                      name: 'accountName',
                      onChange: (e) => {
                        setConnectBankAccFormData({
                          ...connectBankAccFormData,
                          name: e.target.value,
                        });
                      },
                    }}
                  />
                </WrapperTextField>
                <WrapperTextField>
                  <TextFieldComponent
                    label="Sort Code"
                    error={formErrors?.identification?.[0]}
                    inputProps={{
                      mask: '99-99-99',
                      name: 'sortCode',
                      value: connectBankAccFormData.identification,
                      onChange: (e) => {
                        const newFormData = {
                          ...connectBankAccFormData,
                          identification: e.target.value.replace(/-/g, ''),
                        };
                        setConnectBankAccFormData(newFormData);
                        runValidation(sortCodeSchema, newFormData).then(
                          (err) => {
                            setFormErrors(err);
                          }
                        );
                      },
                    }}
                  />
                </WrapperTextField>
                <WrapperTextField>
                  <TextFieldComponent
                    label="Sort code"
                    error={formErrors?.externalAccountId?.[0]}
                    inputProps={{
                      mask: '99999999',
                      name: 'accountNumber',
                      value: connectBankAccFormData.externalAccountId,
                      onChange: (e) => {
                        const newFormData = {
                          ...connectBankAccFormData,
                          externalAccountId: e.target.value,
                        };
                        setConnectBankAccFormData(newFormData);
                        runValidation(accNumberSchema, newFormData).then(
                          (err) => {
                            setFormErrors(err);
                          }
                        );
                      },
                    }}
                  />
                </WrapperTextField>
              </>
            ) : (
              <Banner>
                <Typography variant="body4">
                  We will send a link to add a bank account to the email address
                  <Email>{` `}isaac@gmai.com</Email>
                </Typography>
              </Banner>
            )}

            <ShareWrapper>
              <ShareVerificationLink />
            </ShareWrapper>
          </ConnectBankAccount>
        </>
      )}
      <ButtonWrapper>
        <ButtonWithChildren variant="contained">ADD</ButtonWithChildren>
      </ButtonWrapper>
    </Content>
  );
};

export default AddNewMerchantLimitedCompanyForm;
