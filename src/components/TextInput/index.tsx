import { InputHTMLAttributes } from 'react';
import InputMask, { Props } from 'react-input-mask';
import styled, { css } from 'styled-components';

const borderVariants = {
  error: css`
    border-color: #ef6355;
  `,
  success: css`
    border-color: #2cd19e;
  `,
  default: css`
    border-color: #dbe3eb;
  `,
  active: css`
    border-color: #027aff;
  `,
};

const Input = styled.input`
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

interface WrapperTextField {
  variant?: 'error' | 'success' | 'active' | 'default';
  disabled?: boolean;
}

const WrapperTextField = styled.div<WrapperTextField>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid;
  border-radius: 5px;
  padding: 14px;
  background: #ffffff;
  ${({ disabled }) => (disabled ? 'background: #f4f7f9' : '')}
  ${({ variant }) => borderVariants[variant || 'default']}
  &:focus-within {
    ${({ variant }) =>
      variant === 'error' ? borderVariants[variant] : borderVariants['active']}
  }
  &:hover {
    border: 1px solid rgba(129, 129, 165, 0.66);
    box-shadow: 0px 0px 8px rgba(129, 129, 165, 0.25);
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

const StyledInputMask = styled(InputMask)<Props>`
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

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  rightIcon?: () => JSX.Element;
  leftIcon?: () => JSX.Element;
  variant?: 'error' | 'success' | 'active' | 'default';
  mask?: string;
}

const TextInput: React.FunctionComponent<TextInputProps> = ({
  rightIcon,
  leftIcon,
  disabled,
  variant,
  mask,
  ...rest
}) => {
  return (
    <WrapperTextField variant={variant} disabled={disabled}>
      {leftIcon && <IconWrapper>{leftIcon()}</IconWrapper>}
      {/* @ts-ignore */}
      {mask ? (
        <StyledInputMask
          mask={mask}
          maskChar={null} // wrong types from developr's side
          disabled={disabled}
          {...rest}
        />
      ) : (
        <Input disabled={disabled} {...rest} />
      )}
      {rightIcon && <IconWrapper>{rightIcon()}</IconWrapper>}
    </WrapperTextField>
  );
};

export default TextInput;
