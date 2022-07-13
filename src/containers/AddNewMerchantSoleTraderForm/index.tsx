import React, { ChangeEvent } from 'react';
import * as yup from 'yup';
import DropdownFormField from '../../components/DropdownFormField';
import Form from '../../components/Form';
import TextFormField from '../../components/TextFormField';
import { industries } from '../../constant/industries';

const soleTraderSchema = yup.object().shape({
  utr: yup
    .string()
    .matches(/^[0-9]*$/, 'UTR cannot include letters')
    .nullable()
    .transform((o, c) => (o === '' ? null : c))
    .min(10, 'Enter valid UTR')
    .max(10, 'Enter valid UTR'),
  phoneNumber: yup
    .string()
    .matches(/[0-9]+/, 'Phone number is not valid')
    .matches(/\w{2} 0?\d{0,10}$/, 'Phone number length exceeded'),
  identification: yup.string().min(6, 'Sort code must be 6 digits'),
  externalAccountId: yup.string().min(8, 'Account number must be 8 digits'),
});

const company: any = {
  countryName: 'United Kingdom',
  code: '+44',
  country: 'GB',
  identifier: '',
  tradingName: '',
  tradingAddress: '',
  industry: '',
};

interface AddNewMerchantSoleTraderFormProps {
  countryData: {
    country?: string;
    countryName?: string;
  };
}

const AddNewMerchantSoleTraderForm: React.FunctionComponent<
  AddNewMerchantSoleTraderFormProps
> = ({ countryData: { country } }) => {
  const defaultValues = {
    utr: '',
    tradingName: '',
    tradingAddress: '',
    businessName: '',
    businessAddress: '',
    contactName: '',
    email: '',
    industry: '',
    taxpayerId: '',
  };

  const onChange =
    (key: string) => async (event: ChangeEvent<HTMLInputElement>) => {
      // if (businessType === 'limited') {
      //   const newValues = { ...limitedFormData, [key]: event.target.value };
      //   setLimitedFormData(newValues);
      //   console.log(key, country, event.target.value);
      //   if (key === 'crn' && country.country === 'GB') {
      //     runValidation(addNewMerchantSchema, newValues).then((err) => {
      //       setFormErrors(err);
      //     });
      //   }
      //   if (
      //     key === 'crn' &&
      //     country.country === 'GB' &&
      //     event.target.value.length >= 8
      //   ) {
      //   }
      // } else {
      //   const newValues = {
      //     ...soleTraderFormData,
      //     [key]: event.target.value,
      //   };
      //   setSoleTraderFormData(newValues);
      //   if (key === 'utr' && country.country === 'GB') {
      //     runValidation(addNewMerchantSchema, newValues).then((err) => {
      //       setFormErrors(err);
      //     });
      //   }
      // }
    };

  const onChangeIndustry = (name: string) => {
    // if (businessType === 'limited') {
    //   setLimitedFormData({ ...limitedFormData, industry: name });
    // } else {
    //   setSoleTraderFormData({ ...soleTraderFormData, industry: name });
    // }
  };

  const onSubmit = (data: any) => console.log(data);

  const industriesItems = industries.map(el => ({
    label: el.category,
    items: el.specifics.map(elem => ({
      label: elem,
      value: elem
    }))
  }));

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      validationSchema={soleTraderSchema}
    >
      <TextFormField
        name="utr"
        required={country !== 'GB'}
        label={country !== 'GB'
        ? 'Taxpayer identification number'
        : 'Unique Taxpayer Reference (UTR)'}
      />
      <TextFormField name="tradingName" required label="Trading name" />
      <TextFormField name="tradingAddress" required label="Trading address" />
      <TextFormField
        name="taxpayerId"
        required
        label="Taxpayer identification number"
      />
      <DropdownFormField
        required
        name='industry'
        placeholder="Choose industry"
        label="Industry"
        items={industriesItems}
      />
      <TextFormField name="businessName" required label="Business name" />
      <TextFormField name="contactName" required label="Contact name" />
      <TextFormField name="email" required label="Email" />

      {/* <WrapperTextField>
        <PhoneInput
          error={errors?.phoneNumber?.[0]}
          required
          label="Phone number"
          onChange={(e) => {
            const newSoleTraderFormData = {
              ...soleTraderFormData,
              phoneNumber: e.target.value,
            };
            setSoleTraderFormData(newSoleTraderFormData);
            runValidation(soleTraderSchema, newSoleTraderFormData).then(
              (err) => {
                setFormErrors(err);
              }
            );
          }}
        />
      </WrapperTextField> */}
      <button type="submit">done</button>
    </Form>
  );
};

export default AddNewMerchantSoleTraderForm;
