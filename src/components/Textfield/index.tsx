import { ChangeEvent, FC } from 'react';
import styled, { css } from 'styled-components';
import InputMask, { Props } from 'react-input-mask';

const FullWidth = css`
  width: 100%;
`;

const BorderError = css`
  border-color: #ef6355;
`;

const BorderSuccess = css`
  border-color: #2cd19e;
`;

const DefaultBorder = css`
  border-color: #dbe3eb;
`;

const BorderActive = css`
  border-color: #027aff;
`;

const TextField = styled(InputMask)<Props>`
  border: none;
  width: 100%;

  outline: none;

  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #0e233e;

  &:disabled {
    background: #f4f7f9;
  }

  ::placeholder {
    color: #9898ad;
  }
`;

const FieldLabel = styled.label`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 8px;
  line-height: 17px;
  color: #13273f;
`;

const ErrorMessage = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #38b6ff;
  margin-top: 5px;
`;

const Container = styled.div<{ fullWidth?: boolean }>`
  ${({ fullWidth }) => (fullWidth ? FullWidth : '')}
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const WrapperTextField = styled.div<{
  variant?: string;
  error?: boolean;
  borderColor?: string;
  disabled?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid;
  border-radius: 5px;
  padding: 14px;
  background: #ffffff;
  ${({ error, borderColor }) =>
    error ? BorderError : borderColor ? BorderSuccess : DefaultBorder}
  &:focus-within {
    ${({ error }) => (error ? BorderError : BorderActive)}
  }
  &:hover {
    border: 1px solid rgba(129, 129, 165, 0.66);
    box-shadow: 0px 0px 8px rgba(129, 129, 165, 0.25);
  }
  ${({ disabled }) => (disabled ? 'background: #f4f7f9' : '')}
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const InputError = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #ef6355;
  padding-top: 5px;
`;

interface IInputProps {
  placeholder?: string;
  value?: any;
  type?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  mask?: string | Array<string | RegExp>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}
interface ITextFieldComponent {
  label?: string | JSX.Element;
  fullWidth?: boolean;
  error?: any;
  variant?: string;
  leftIcon?: any;
  inputProps?: IInputProps;
  icon?: any;
  disabled?: boolean;
  borderColor?: any;
}

const TextFieldComponent: FC<ITextFieldComponent> = (props) => {
  return (
    <Container fullWidth={props.fullWidth}>
      {props.label && (
        <FieldLabel>
          {props.label}{' '}
          {props.inputProps?.required && (
            <span style={{ color: 'red' }}>*</span>
          )}
        </FieldLabel>
      )}
      <WrapperTextField
        error={props.error}
        variant={props.variant}
        borderColor={props.borderColor}
        disabled={props.disabled}
      >
        {props.leftIcon && (
          <IconWrapper>
            <props.leftIcon />
          </IconWrapper>
        )}
        <TextField
          maskChar={null}
          disabled={props.disabled}
          {...props.inputProps}
        />
        {props.icon && (
          <IconWrapper>
            <props.icon />
          </IconWrapper>
        )}
      </WrapperTextField>
      {props.error && <InputError>{props.error}</InputError>}
    </Container>
  );
};

export default TextFieldComponent;
