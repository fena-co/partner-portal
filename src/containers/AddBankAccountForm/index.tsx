import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '../../components/Typography';
import ShareVerificationLink from '../../components/ShareVerificationLink';
import DropdownFormField from '../../components/DropdownFormField';
import TextFormField from '../../components/TextFormField';
import { Control } from 'react-hook-form';
import RadioButton from '../../components/RadioButton';
import Api from '../../util/api';

const StyledDropdownFormField = styled(DropdownFormField)`
  padding-top: 20px;
`;

const Title = styled(Typography)`
  text-align: center;
  &:last-of-type {
    padding-top: 30px;
    margin-bottom: 10px;
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

const StyledRadioButton = styled(RadioButton)`
  margin-top: 10px;
`;

interface AddBankAccountProps {
  control: Control;
  renderType: string;
}

const AddBankAccountForm: NextPage<AddBankAccountProps> = ({
  control,
  renderType,
}) => {
  const [providers, setProviders] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const getProviders = async () => {
    const results = await Api.getProviders();
    const mapped = results.map((result: any) => ({
      label: result.name,
      value: result._id,
    }));
    setProviders(
      mapped.sort(function (a, b) {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      })
    );
  };

  useEffect(() => {
    getProviders();
  }, []);

  return (
    <>
      <Title variant="subtitle4">Add bank account</Title>
      <StyledRadioButton
        name="bankDetailsType"
        value="manual"
        control={control}
        label="Add the details manually"
      />
      <StyledRadioButton
        name="bankDetailsType"
        value="ask"
        control={control}
        label="Ask merchant to add their bank account using online banking"
      />

      <ConnectBankAccount>
        {renderType === 'manual' ? (
          <>
            <StyledDropdownFormField
              name="provider"
              control={control}
              placeholder="Choose bank"
              label="Select bank"
              items={providers}
            />
            <TextFormField name="name" control={control} label="Account name" />
            <TextFormField
              name="identification"
              control={control}
              label="Sort code"
              mask="99-99-99"
            />
            <TextFormField
              name="externalAccountId"
              control={control}
              label="Account number"
            />
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
  );
};

export default AddBankAccountForm;
