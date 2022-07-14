import { FC } from 'react';
import styled from 'styled-components';
import Dropdown from '../Dropdown';
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

interface Item {
  label: string;
  value: string;
}

interface DeepItem {
  label: string;
  items: Item[];
}
interface DropdownFormFieldProps {
  items: (Item | DeepItem)[];
  leftIcon?: () => JSX.Element;
  name: string;
  control?: Control;
  label?: string | JSX.Element;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const DropdownFormField: FC<DropdownFormFieldProps> = ({
  items,
  label,
  name,
  control,
  leftIcon,
  required,
  className,
  ...inputProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error }}) => (
        <div className={className}>
          {label && (
            <FieldLabel>
              {label} {required && <span style={{ color: 'red' }}>*</span>}
            </FieldLabel>
          )}
          <Dropdown
            items={items}
            leftIcon={leftIcon}
            {...inputProps}
            {...field}
          />
          {error && (
            <ErrorMessage>
              {(error && (error as any).label.message) || (error as any).value.message}
            </ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

export default DropdownFormField;
