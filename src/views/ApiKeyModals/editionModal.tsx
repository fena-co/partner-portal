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
import ReactTooltip from 'react-tooltip';

const StyledTextFormField = styled(TextFormField)`
  padding-top: 0;
`;

const Label = styled(Typography)`
  margin-bottom: 5px;
`;

const StyledButtonCreation = styled(ButtonCreation)`
  margin-left: 10px;
`;
interface CreationModalProps {
  handleClose: () => void;

  control: Control;
  data: any;
}

const EditionModal: React.FunctionComponent<CreationModalProps> = ({
  handleClose,
  control,
  data,
}) => {
  console.log('edition', data);
  return (
    <ModalWrapperContent>
      <ModalHeader>
        <Typography variant="body1">Edit API Key</Typography>
        <CloseCircledButton onClick={handleClose}>
          <CloseIcon />
        </CloseCircledButton>
      </ModalHeader>
      <ModalBody>
        <StyledTextFormField name="newApiKey" control={control} label="Name" />
      </ModalBody>
      <WrapperModalButton>
        <ButtonCreation form="api-create" type="submit" variant="contained">
          Save
        </ButtonCreation>
      </WrapperModalButton>
    </ModalWrapperContent>
  );
};

export default EditionModal;
