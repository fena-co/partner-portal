import { ChangeEvent, FocusEvent, FC } from 'react';
import styled, { css } from 'styled-components';

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

const TextArea = styled.textarea`
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
    color: #c6d1dd;
    border-bottom: 1px solid #dbe3eb;
    background: #ffffff;
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
`;

const WrapperTextArea = styled.div<{
  variant?: string;
  error?: boolean;
  borderColor?: string;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid;
  border-radius: 5px;
  padding: 14px;
  ${({ error, borderColor }) =>
    error ? BorderError : borderColor ? BorderSuccess : DefaultBorder}
  &:focus-within {
    ${({ error }) => (error ? BorderError : BorderActive)}
  }
  &:hover {
    border: 1px solid rgba(129, 129, 165, 0.66);
    box-shadow: 0px 0px 8px rgba(129, 129, 165, 0.25);
  }
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
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
}
interface ITextAreaComponent {
  label?: string;
  fullWidth?: boolean;
  error?: any;
  variant?: string;
  leftIcon?: any;
  inputProps?: IInputProps;
  icon?: any;
  disabled?: boolean;
  borderColor?: any;
}

const TextAreaComponent: FC<ITextAreaComponent> = (props) => {
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
      <WrapperTextArea
        error={props.error}
        variant={props.variant}
        borderColor={props.borderColor}
      >
        <TextArea {...props.inputProps} />
        {props.icon && (
          <IconWrapper>
            <props.icon />
          </IconWrapper>
        )}
      </WrapperTextArea>
      {props.error && <InputError>{props.error}</InputError>}
    </Container>
  );
};

export default TextAreaComponent;
