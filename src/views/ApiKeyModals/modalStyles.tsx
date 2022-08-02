import styled from 'styled-components';
import Close from 'image/icon/close.svg';

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid #dbe3eb;
`;

export const ModalWrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 30px;
  width: 450px;
`;

export const CloseCircledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dbe3eb;
  border-radius: 50%;
  padding: 5px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

export const CloseIcon = styled(Close)`
  fill: #495b6c;
`;

export const ModalBody = styled.div`
  padding: 15px 0;
`;

export const WrapperModalButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;
