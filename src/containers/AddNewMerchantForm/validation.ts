import * as yup from 'yup';

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

export const addBankAccountSchema = {
  provider: yup.object({
    label: yup.string(),
    value: yup.string(),
  }),
  name: yup.string(),
  identification: yup
    .string()
    .nullable()
    .transform((o, c) => (o === '' ? null : c))
    .matches(/\d{2}-\d{2}-\d{2}/, 'Sort code is invalid'),
  externalAccountId: yup
    .string()
    .nullable()
    .transform((o, c) => (o === '' ? null : c))
    .min(8, 'Account number must be 8 digits')
    .max(8, 'Account number must be 8 digits'),
};

export const soleTraderSchema = yup.object({
  ...businessInfoSchema,
  ...addBankAccountSchema,
  soleTrader: yup.object({
    utr: yup
      .string()
      .matches(/^[0-9]*$/, 'UTR cannot include letters')
      .nullable()
      .transform((o, c) => (o === '' ? null : c))
      .min(10, 'Enter valid UTR')
      .max(10, 'Enter valid UTR'),
    tradingName: yup.string().required('This field is required'),
    address: yup.object({
      addressLine1: yup.string().required('This field is required'),
      addressLine2: yup.string(),
      city: yup.string().required('This field is required'),
      zipCode: yup.string().required('This field is required'),
    }),
    industry: yup.object({
      label: yup.string(),
      value: yup.string(),
    }),
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
        // .nullable()
        // .transform((o, c) => (o === '' ? null : c))
        .matches(/^[0-9]+$/, 'Phone number is not valid')
        .matches(/^(0?\d{0,10})$/, 'Phone number length exceeded'),
    }),
    publicWebsite: yup.string().url('Enter correct url'),
  }),
});

export const limitedCompanySchema = yup.object({
  ...businessInfoSchema,
  ...addBankAccountSchema,
  limitedCompany: yup.object({
    crn: yup
      .string()
      .min(8, 'Enter valid CRN')
      .max(8, 'Enter valid CRN')
      .matches(/[a-zA-Z]{2}[0-9]{6}|[0-9]{8}/, 'Enter valid CRN'),
    registeredName: yup.string().required('This field is required'),
    address: yup.object({
      addressLine1: yup.string().required('This field is required'),
      addressLine2: yup.string(),
      city: yup.string().required('This field is required'),
      zipCode: yup.string().required('This field is required'),
    }),
    industry: yup.object({
      label: yup.string(),
      value: yup.string(),
    }),
    tradingName: yup.string(),
    tradingAddress: yup.object({
      addressLine1: yup.string().required('This field is required'),
      addressLine2: yup.string(),
      city: yup.string().required('This field is required'),
      zipCode: yup.string().required('This field is required'),
    }),
    registrationNumber: yup.string(),
    primaryContactName: yup.string().when('isDirector', {
      is: true,
      then: yup.string().required('This field is required'),
    }),
    email: yup
      .string()
      .email('Email must be valid')
      .when('isDirector', {
        is: true,
        then: yup
          .string()
          .email('Email must be valid')
          .required('This field is required'),
      }),
    phoneNumber: yup.object().when('isDirector', {
      is: (isDirector: boolean) => isDirector,
      then: yup.object().shape({
        code: yup.string().required(),
        number: yup
          .string()
          .required('This field is required')
          .matches(/^[0-9]+$/, 'Phone number is not valid')
          .matches(/^(0?\d{0,10})$/, 'Phone number length exceeded'),
      }),
      otherwise: yup.object().shape({
        code: yup.string(),
        number: yup
          .string()
          .nullable()
          .transform((o, c) => (o === '' ? null : c))
          .matches(/^[0-9]+$/, 'Phone number is not valid')
          .matches(/^(0?\d{9}|\d{8})$/, 'Phone number is not valid'),
      }),
    }),
    // phoneNumber: yup.object({
    //   code: yup.string().required(),
    //   number: yup
    //     .string()
    //     .nullable()
    //     .transform((o, c) => (o === '' ? null : c))
    //     .matches(/^[0-9]+$/, 'Phone number is not valid')
    //     .matches(/^(0?\d{9}|\d{8})$/, 'Phone number is not valid'),
    // }),
    publicWebsite: yup.string().url('Enter correct url'),
    isDirector: yup.boolean(),
    directorContactName: yup.string().when('isDirector', {
      is: false,
      then: yup.string().required('This field is required'),
    }),
    directorEmail: yup
      .string()
      .email('Email must be valid')
      .when('isDirector', {
        is: false,
        then: yup
          .string()
          .email('Email must be valid')
          .required('This field is required'),
      }),

    directorPhoneNumber: yup.object().when('isDirector', {
      is: (isDirector: boolean) => !isDirector,
      then: yup.object().shape({
        code: yup.string().required(),
        number: yup
          .string()
          .required('This field is required')
          .matches(/^[0-9]+$/, 'Phone number is not valid')
          .matches(/^(0?\d{9}|\d{8})$/, 'Phone number is not valid'),
      }),
      otherwise: yup.object().shape({
        code: yup.string(),
        number: yup.string(),
      }),
    }),
    sendEmail: yup.boolean(),
  }),
});

export const addMerchantSchema = yup.lazy((values) => {
  if (values.businessType.value === 'limited') {
    return limitedCompanySchema;
  } else if (values.businessType.value === 'individual') {
    return soleTraderSchema;
  } else {
    return yup.object();
  }
});
