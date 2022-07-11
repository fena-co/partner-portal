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
import Api from '../../util/api';
import IndustrySelectionDropdown from '../../components/IndustrySelectionDropdown';
import SearchIcon from 'image/icon/search-blue.svg';
import PhoneInput from '../../components/PhoneInput';

const crnValidation = yup.object().shape({
  crn: yup
    .string()
    .min(8, 'Enter valid CRN')
    .max(8, 'Enter valid CRN')
    .matches(/[a-zA-Z]{2}[0-9]{6}|[0-9]{8}/, 'Enter valid CRN'),
  utr: yup
    .string()
    .matches(/^[0-9]*$/, 'UTR cannot include letters')
    .nullable()
    .transform((o, c) => (o === '' ? null : c))
    .min(10, 'Enter valid UTR')
    .max(10, 'Enter valid UTR'),
});

const phoneValidation = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/[0-9]+/, 'Phone number is not valid')
    .matches(/\w{2} 0?\d{0,10}$/, 'Phone number length exceeded'),
});

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

const Wrapper = styled.section``;

const Header = styled.div`
  display: flex;
  border-bottom: 1px solid #dbe3eb;
  padding: 20px;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  padding: 30px calc((100vw - 380px) / 2);
`;

const Title = styled(Typography)`
  text-align: center;
`;

const WrapperTextField = styled.div`
  margin-top: 10px;
  &:first-child {
    margin-top: 0px;
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

const Create: NextPage = () => {
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
    industry: company.industry || '',
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

  const [address, setAddress] = useState(
    company.type
      ? {
          addressLine1:
            company.type === CompanyTypes.COMPANY
              ? company.address?.addressLine1 || ''
              : company.tradingAddress?.addressLine1 || '',
          addressLine2:
            company.type === CompanyTypes.COMPANY
              ? company.address?.addressLine2 || ''
              : company.tradingAddress?.addressLine2 || '',
          zipCode:
            company.type === CompanyTypes.COMPANY
              ? company.address?.zipCode || ''
              : company.tradingAddress?.zipCode || '',
          city:
            company.type === CompanyTypes.COMPANY
              ? company.address?.city || ''
              : company.tradingAddress?.city || '',
        }
      : {
          addressLine1: '',
          addressLine2: '',
          zipCode: '',
          city: '',
        }
  );

  const onBusinessTypeChange = (type: keyof typeof businessTypes) => () => {
    setBusinessType(type);
  };

  const findCompaniesHouseData = (crn: string) => {
    return Api.getCompaniesHouseData(crn);
  };

  const onChange =
    (key: string) => async (event: ChangeEvent<HTMLInputElement>) => {
      console.log(businessType);
      if (businessType === 'limited') {
        const newValues = { ...limitedFormData, [key]: event.target.value };
        setLimitedFormData(newValues);
        console.log(key, country, event.target.value);
        if (key === 'crn' && country.country === 'GB') {
          runValidation(crnValidation, newValues).then((err) => {
            setFormErrors(err);
          });
        }
        if (
          key === 'crn' &&
          country.country === 'GB' &&
          event.target.value.length >= 8
        ) {
          console.log('should get ch result');
          const chResult = await findCompaniesHouseData(event.target.value);
          console.log(chResult);
          setLimitedFormData((data) => ({
            ...data,
            registeredName: chResult.company_name,
          }));
          const officeAddress = chResult.registered_office_address;
          setAddress({
            addressLine1: officeAddress.address_line_1,
            addressLine2: officeAddress.address_line_2,
            city: officeAddress.locality,
            zipCode: officeAddress.postal_code,
          });
        }
      } else {
        const newValues = {
          ...soleTraderFormData,
          [key]: event.target.value,
        };
        setSoleTraderFormData(newValues);
        if (key === 'utr' && country.country === 'GB') {
          runValidation(crnValidation, newValues).then((err) => {
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

  return (
    <Wrapper>
      <Header>
        <Typography>Add new merchant</Typography>
      </Header>
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
                  name: 'utr',
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
                placeholder='Choose industry'
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
                  runValidation(phoneValidation, newSoleTraderFormData).then(
                    (err) => {
                      setFormErrors(err);
                    }
                  );
                }}
              />
            </WrapperTextField>
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default Create;
