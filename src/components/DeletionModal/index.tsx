import CloseIcon from 'image/icon/close.svg';
import { FC } from 'react';
import styled from 'styled-components';
import ButtonText from '../ButtonText';
import Typography from '../Typography';

const Container = styled.div`
  padding: 15px 44px;
  min-width: 400px;
`;

const Label = styled(Typography)`
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 31px 0;
`;

const ButtonRed = styled(ButtonText)`
  background: #ef6355;
  color: #fff;
  border: none;

  & > p {
    color: #fff;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 18px 0;
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #dbe3eb;
  cursor: pointer;
`;

const Close = styled(CloseIcon)`
  fill: #13273f;
  cursor: pointer;
`;

interface DeletionProps {
  handleCancel: () => void;
  handleDelete?: () => void;
  label?: string;
  text?: string;
  buttonLabel: string;
}

export const Deletion: FC<DeletionProps> = ({
  handleCancel,
  handleDelete,
  label,
  text,
  buttonLabel,
}) => {
  return (
    <Container>
      <Header>
        <CloseButton onClick={handleCancel}>
          <Close />
        </CloseButton>
      </Header>
      <Label variant="subtitle5" color="#EF6355">
        {label}
      </Label>
      <Typography variant="body4">{text}</Typography>
      <ButtonWrapper>
        <ButtonText
          style={{ margin: '0', padding: '7px 20px' }}
          variant="outline"
          onClick={handleCancel}
        >
          <Typography variant="body4">Cancel</Typography>
        </ButtonText>
        <ButtonRed
          style={{
            margin: '0 9px',
            padding: '7px 20px',
          }}
          variant="outline"
          onClick={handleDelete}
        >
          <Typography variant="body4">{buttonLabel}</Typography>
        </ButtonRed>
      </ButtonWrapper>
    </Container>
  );
};

export default Deletion;
