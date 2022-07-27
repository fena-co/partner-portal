import styled from 'styled-components';
import Typography from '../../components/Typography';
import ReactTooltip from 'react-tooltip';
import {
  CloseCircledButton,
  CloseIcon,
  ModalBody,
  ModalHeader,
  ModalWrapperContent,
  WrapperModalButton,
} from './modalStyles';
import { ButtonCreation } from '../../components/StyledComponents';

const StyledTypography = styled(Typography)`
  padding: 15px 0;
`;

interface CreationModalProps {
  handleClose: () => void;
  itemSecretData: string;
}

const ViewSecretModal: React.FunctionComponent<CreationModalProps> = ({
  handleClose,
  itemSecretData,
}) => {
  return (
    <ModalWrapperContent>
      <ModalHeader>
        <Typography variant="body1">Terminal Secret</Typography>
        <CloseCircledButton onClick={handleClose}>
          <CloseIcon />
        </CloseCircledButton>
      </ModalHeader>
      <ModalBody>
        <StyledTypography>{itemSecretData}</StyledTypography>
      </ModalBody>
      <WrapperModalButton>
        <ReactTooltip id="secretCopyBtn" />
        <ButtonCreation
          onClick={() => {
            const el = document.createElement('textarea');
            el.value = itemSecretData;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
          }}
          variant="contained"
          data-effect="solid"
          data-for="secretCopyBtn"
          data-background-color="#2b2b2bd9"
          data-place="top"
          data-tip="Copied to clipboard"
          data-event="click"
          data-event-off="mouseleave"
          data-iscapture
        >
          Copy secret
        </ButtonCreation>
      </WrapperModalButton>
    </ModalWrapperContent>
  );
};

export default ViewSecretModal;
