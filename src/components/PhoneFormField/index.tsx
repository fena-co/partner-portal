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
  required,
  className,
  ...inputProps
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
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
            {(error && (error as any).number.message) || (error as any).code.message}
          </ErrorMessage>
        )}
      </div>
    )}
  />
);

export default PhoneFormField;
