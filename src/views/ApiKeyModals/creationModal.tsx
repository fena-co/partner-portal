import { Control } from 'react-hook-form';
import styled from 'styled-components';
import TextFormField from '../../components/TextFormField';
import Typography from '../../components/Typography';
import { ButtonCreation } from '../../components/StyledComponents';
import {
  CloseCircledButton,
  CloseIcon,
  ModalBody,
  ModalHeader,
  ModalWrapperContent,
  WrapperModalButton,
} from './modalStyled';
import api from '../../util/api';

const StyledTextFormField = styled(TextFormField)`
  padding-top: 0;
`;

interface CreationModalProps {
  handleClose: () => void;
  control: Control;
}

const CreationModal: React.FunctionComponent<CreationModalProps> = ({
  handleClose,
  control,
}) => {
  // const handlerCreateKey = async () => {
  //   const response = await api.createApiKey(name);
  //   console.log(response);
  // };
  return (
    <ModalWrapperContent>
      <ModalHeader>
        <Typography variant="body1">New API Key</Typography>
        <CloseCircledButton onClick={handleClose}>
          <CloseIcon />
        </CloseCircledButton>
      </ModalHeader>
      <ModalBody>
        <StyledTextFormField name="apiKey" control={control} label="Name" />
      </ModalBody>
      <WrapperModalButton>
        <ButtonCreation variant="contained">Create key</ButtonCreation>
      </WrapperModalButton>
    </ModalWrapperContent>
  );
};

export default CreationModal;
