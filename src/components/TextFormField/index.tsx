import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import TextInput from '../TextInput';

const FieldLabel = styled.label`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 8px;
  line-height: 17px;
  color: #13273f;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
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

interface TextFormFieldProps extends HTMLInputElement {
  name: string;
  register: UseFormRegister<any>,
  rightIcon?: () => JSX.Element;
  leftIcon?: () => JSX.Element;
  label?: string | JSX.Element;
  error?: any;
}

const TextFormField: React.FunctionComponent<TextFormFieldProps> = ({
  label,
  name,
  register,
  rightIcon,
  leftIcon,
  disabled,
  error,
  ...inputProps
}) => {
  return (
    <Container>
      {label && (
        <FieldLabel>
          {label}{' '}
          {inputProps?.required && <span style={{ color: 'red' }}>*</span>}
        </FieldLabel>
      )}
      <TextInput
        disabled={disabled}
        variant={error ? 'error' : 'default'}
        {...register(name)}
        {...inputProps}
      />
      {error && <InputError>{error}</InputError>}
    </Container>
  );
};

export default TextFormField;
