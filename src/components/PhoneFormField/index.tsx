import { FC } from 'react';
import styled from 'styled-components';
import PhoneInput from '../PhoneInput';
import { Control, Controller } from 'react-hook-form';

const ErrorMessage = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #ef6355;
  margin-top: 5px;
`;

const FieldLabel = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 8px;
  line-height: 17px;
`;

interface PhoneFormFieldProps {
  name: string;
  control?: Control;
  rightIcon?: () => JSX.Element;
  leftIcon?: () => JSX.Element;
  label?: string | JSX.Element;
  error?: any;
  disabled?: boolean;
  required?: boolean;
}

const PhoneFormField: FC<PhoneFormFieldProps> = ({
  label,
  name,
  control,
  rightIcon,
  leftIcon,
  disabled,
  error,
  required,
  ...inputProps
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <>
        {label && (
          <FieldLabel>
            {label} {required && <span style={{ color: 'red' }}>*</span>}
          </FieldLabel>
        )}
        <PhoneInput {...field} {...inputProps} />
        {error && (
          <ErrorMessage>
            {(error && error.number.message) || error.code.message}
          </ErrorMessage>
        )}
      </>
    )}
  />
);

export default PhoneFormField;
