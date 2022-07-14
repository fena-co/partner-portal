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
  color: #13273f;
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
  className?: string;
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
  className,
  ...inputProps
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <div className={className}>
        {label && (
          <FieldLabel>
            {label} {required && <span style={{ color: 'red' }}>*</span>}
          </FieldLabel>
        )}
        <PhoneInput
          variant={error ? 'error' : 'default'}
          {...field}
          {...inputProps}
        />
        {error && (
          <ErrorMessage>
            {(error && error.number.message) || error.code.message}
          </ErrorMessage>
        )}
      </div>
    )}
  />
);

export default PhoneFormField;
