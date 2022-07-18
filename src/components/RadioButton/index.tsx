import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import Typography from '../Typography';

const Label = styled.label`
  display: flex;
  align-items: flex-start;
`;

const RadioInput = styled.input`
  accent-color: black;
  margin-right: 10px;
`;

const Required = styled.span`
  color: red;
`;

interface RadioButtonProps {
  label: string;
  name: string;
  required?: boolean;
  control: Control;
  value: string;
  className?: string;
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = ({
  label,
  name,
  control,
  required,

  className,
  ...inputProps
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <Label className={className}>
        <RadioInput
          defaultChecked={inputProps.value === field.value}
          type="radio"
          {...field}
          {...inputProps}
        />
        <Typography variant="lightBody">
          {label} {required && <Required>*</Required>}
        </Typography>
      </Label>
    )}
  />
);

export default RadioButton;
