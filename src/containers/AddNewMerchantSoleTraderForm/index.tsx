import React from 'react';
import * as yup from 'yup';
import DropdownFormField from '../../components/DropdownFormField';
import Form from '../../components/Form';
import PhoneFormField from '../../components/PhoneFormField';
import TextFormField from '../../components/TextFormField';
import { industries } from '../../constant/industries';

const soleTraderSchema = yup.object({
  utr: yup
    .string()
    .matches(/^[0-9]*$/, 'UTR cannot include letters')
    .nullable()
    .transform((o, c) => (o === '' ? null : c))
    .min(10, 'Enter valid UTR')
    .max(10, 'Enter valid UTR'),
  phoneNumber: yup.object({
    code: yup.string().required(),
    number: yup
      .string()
      .matches(/^[0-9]+/, 'Phone number is not valid')
      .matches(/^0?\d{0,10}$/, 'Phone number length exceeded')
      .required()
  }),
  identification: yup.string().min(6, 'Sort code must be 6 digits'),
  externalAccountId: yup.string().min(8, 'Account number must be 8 digits'),
});

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
    phoneNumber: {
      code: 'GB',
      number: ''
    }
  };

  const onSubmit = (data: any) => {
    console.log(data)
  };

  const industriesItems = industries.map((el) => ({
    label: el.category,
    items: el.specifics.map((elem) => ({
      label: elem,
      value: elem,
    })),
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
        label={
          country !== 'GB'
            ? 'Taxpayer identification number'
            : 'Unique Taxpayer Reference (UTR)'
        }
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
        name="industry"
        placeholder="Choose industry"
        label="Industry"
        items={industriesItems}
      />
      <TextFormField name="businessName" required label="Business name" />
      <TextFormField name="contactName" required label="Contact name" />
      <TextFormField name="email" required label="Email" />
      <PhoneFormField required name="phoneNumber" label="Phone number" />
    </Form>
  );
};

export default AddNewMerchantSoleTraderForm;
