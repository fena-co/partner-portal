import React, { InputHTMLAttributes } from 'react';
import { Controller, Control } from 'react-hook-form';
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

interface TextFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control?: Control;
  rightIcon?: () => JSX.Element;
  leftIcon?: () => JSX.Element;
  label?: string | JSX.Element;
  error?: any;
}

const TextFormField: React.FunctionComponent<TextFormFieldProps> = ({
  label,
  name,
  control,
  rightIcon,
  leftIcon,
  disabled,
  error,
  required,
  ...inputProps
}) =>
  (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field }) => 
          <>
            {label && (
              <FieldLabel>
                {label}{' '}
                {required && (
                  <span style={{ color: 'red' }}>*</span>
                )}
              </FieldLabel>
            )}
            <TextInput
              disabled={disabled}
              variant={error ? 'error' : 'default'}
              {...inputProps}
              {...field}
            />
            {error && <InputError>{error.message}</InputError>}
          </>
        }
      />
    </Container>
  );

export default TextFormField;
