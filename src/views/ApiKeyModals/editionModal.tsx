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
} from './modalStyles';

const StyledTextFormField = styled(TextFormField)`
  padding-top: 0;
`;

interface CreationModalProps {
  handleClose: () => void;

  control: Control;
}

const EditionModal: React.FunctionComponent<CreationModalProps> = ({
  handleClose,
  control,
}) => {
  return (
    <ModalWrapperContent>
      <ModalHeader>
        <Typography variant="body1">Edit API Key</Typography>
        <CloseCircledButton onClick={handleClose}>
          <CloseIcon />
        </CloseCircledButton>
      </ModalHeader>
      <ModalBody>
        <StyledTextFormField name="newKeyName" control={control} label="Name" />
      </ModalBody>
      <WrapperModalButton>
        <ButtonCreation form="api-edit" type="submit" variant="contained">
          Save
        </ButtonCreation>
      </WrapperModalButton>
    </ModalWrapperContent>
  );
};

export default EditionModal;
