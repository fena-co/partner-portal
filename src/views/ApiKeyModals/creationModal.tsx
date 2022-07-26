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
import api from '../../util/api';
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
  toggleCreation: () => void;
  control: Control;
  isKeyCreated: boolean;
  secretKey: string;
}

const CreationModal: React.FunctionComponent<CreationModalProps> = ({
  handleClose,
  toggleCreation,
  control,
  isKeyCreated,
  secretKey,
}) => {
  return (
    <ModalWrapperContent>
      <ModalHeader>
        <Typography variant="body1">New API Key</Typography>
        <CloseCircledButton onClick={handleClose}>
          <CloseIcon />
        </CloseCircledButton>
      </ModalHeader>
      <ModalBody>
        {!isKeyCreated ? (
          <StyledTextFormField name="apiKey" control={control} label="Name" />
        ) : (
          <>
            <Label variant="body5">Key</Label>
            <Typography>{secretKey}</Typography>
          </>
        )}
      </ModalBody>
      <WrapperModalButton>
        {!isKeyCreated ? (
          <ButtonCreation form="api-create" type="submit" variant="contained">
            Create key
          </ButtonCreation>
        ) : (
          <>
            <input type="submit" style={{ display: 'none' }} />
            <ButtonCreation
              type="button"
              variant="outlined"
              onClick={toggleCreation}
            >
              Create another
            </ButtonCreation>
            <ReactTooltip id="secretCreateCopyBtn" />
            <StyledButtonCreation
              type="button"
              onClick={() => {
                const el = document.createElement('textarea');
                el.value = secretKey;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
              }}
              variant="contained"
              data-effect="solid"
              data-for="secretCreateCopyBtn"
              data-background-color="#2b2b2bd9"
              data-place="top"
              data-tip="Copied to clipboard"
              data-event="click"
              data-event-off="mouseleave"
              data-iscapture
            >
              Copy secret
            </StyledButtonCreation>
          </>
        )}
      </WrapperModalButton>
    </ModalWrapperContent>
  );
};

export default CreationModal;
