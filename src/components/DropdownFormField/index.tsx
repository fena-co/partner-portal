import { FC } from 'react';
import styled from 'styled-components';
import Dropdown from '../Dropdown';
import { Control, Controller } from 'react-hook-form';
import { FlagIcon, FlagIconCode } from 'react-flag-kit';

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

const FlagContainer = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const StyledFlagIcon = styled(FlagIcon)`
  height: 50%;
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
  withCountryFlags?: boolean;
}

const CountryFlagIcon: React.FunctionComponent<{
  code: FlagIconCode;
}> = ({ code }) =>
  code ? (
    <FlagContainer>
      <StyledFlagIcon code={code} />
    </FlagContainer>
  ) : null;

const DropdownFormField: FC<DropdownFormFieldProps> = ({
  items,
  label,
  name,
  control,
  leftIcon,
  required,
  className,
  withCountryFlags,
  ...inputProps
}) => {
  return (
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
          <Dropdown
            items={items}
            withCountryFlags={withCountryFlags}
            leftIcon={
              withCountryFlags
                ? () => <CountryFlagIcon code={field.value.value} />
                : leftIcon
            }
            {...inputProps}
            {...field}
          />
          {error && (
            <ErrorMessage>
              {(error && (error as any).label.message) ||
                (error as any).value.message}
            </ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

export default DropdownFormField;
