import React, { InputHTMLAttributes } from 'react';
import { Controller, Control } from 'react-hook-form';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

import { FC } from 'react';
import Typography from '../Typography';

import CheckIcon from 'image/icon/check.svg';

const CheckedStyle = css`
  background: #2cd19e;
`;

const UncheckedStyle = css`
  background: #ffffff;
  border: 1px solid #dbe3eb;
`;

const StyledCheckbox = styled.div<{ checked?: boolean }>`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

  ${({ checked }) => (checked ? CheckedStyle : UncheckedStyle)}
  box-sizing: border-box;
  margin-right: 13px;
`;

const HiddenCheckBox = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

interface TextFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control?: Control;
  rightIcon?: () => JSX.Element;
  leftIcon?: () => JSX.Element;
  label?: string | JSX.Element;
  mask?: string;
  className?: string;
}

const CheckboxFormField: React.FunctionComponent<TextFormFieldProps> = ({
  label,
  name,
  control,
  rightIcon,
  leftIcon,
  disabled,
  required,
  className,
  checked,
  ...rest
}) => (
  <Container className={className}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Label>
          <HiddenCheckBox
            type="checkbox"
            {...field}
            {...rest}
            checked={checked}
          />
          <StyledCheckbox checked={checked}>
            {checked && <CheckIcon />}
          </StyledCheckbox>
          {label && (
            <Typography variant="body4" style={{ color: '#6c6c8a' }}>
              {label}
            </Typography>
          )}
        </Label>
      )}
    />
  </Container>
);

export default CheckboxFormField;
