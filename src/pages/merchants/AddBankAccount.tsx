import { Control } from 'react-hook-form';
import styled from 'styled-components';
import TextFormField from '../../components/TextFormField';
import Typography from '../../components/Typography';

import {
  CloseCircledButton,
  CloseIcon,
  ModalHeader,
  ModalWrapperContent,
} from '../../views/ApiKeyModals/modalStyles';
import { useEffect, useState } from 'react';
import Api from '../../util/api';
import DropdownFormField from '../../components/DropdownFormField';
import { ButtonCreation, Plus } from '../../components/StyledComponents';
import Spinner from '../../components/Spinner';

const StyledDropdownFormField = styled(DropdownFormField)`
  padding-top: 20px;
`;

const WrapperButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const SpinnerWrapper = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

interface CreationModalProps {
  handleClose: () => void;
  control: Control;
  loading: boolean;
}

const AddBankAccountModal: React.FunctionComponent<CreationModalProps> = ({
  handleClose,
  control,
  loading,
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
    console.log(mapped);
    setProviders(
      mapped.sort(function (a, b) {
        if (a.label !== 'Other bank') {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        } else {
          return 0;
        }
      })
    );
  };

  useEffect(() => {
    getProviders();
  }, []);

  return (
    <ModalWrapperContent>
      <ModalHeader>
        <Typography variant="body1">Add bank account</Typography>
        <CloseCircledButton onClick={handleClose}>
          <CloseIcon />
        </CloseCircledButton>
      </ModalHeader>
      <>
        <StyledDropdownFormField
          name="provider"
          control={control}
          placeholder="Choose bank"
          label="Select bank"
          items={providers}
          required
        />
        <TextFormField
          name="name"
          control={control}
          label="Account name"
          required
        />
        <TextFormField
          name="identification"
          control={control}
          label="Sort code"
          mask="99-99-99"
          required
        />
        <TextFormField
          name="externalAccountId"
          control={control}
          label="Account number"
          mask="99999999"
          required
        />
      </>
      <WrapperButton>
        <ButtonCreation variant="contained">
          {loading ? (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          ) : (
            <Plus />
          )}
          Add bank account
        </ButtonCreation>
      </WrapperButton>
    </ModalWrapperContent>
  );
};

export default AddBankAccountModal;
