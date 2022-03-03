import { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
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

  ${({ checked }) => (checked ? CheckedStyle : UncheckedStyle)}
  box-sizing: border-box;
  border-radius: 2px;
  margin-right: 13px;
`;

const HiddenCheckBox = styled.input`
  /* display: none; */
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  & > input {
    &:hover {
      ${CheckIcon}
    }
  }
`;

interface ICheckBox {
  checked?: boolean;
  label?: string;
  onChange: (event: any) => void;
  id?: string;
  value: string;
}

const CheckBox: FC<ICheckBox> = ({
  onChange,
  id,
  value,
  checked,
  label,
  ...rest
}) => {
  const [isChecked, setChecked] = useState(false);
  useEffect(() => {
    if (id === value) {
      setChecked(!false);
    }
  }, [id, value]);

  return (
    <Label form={id}>
      <HiddenCheckBox
        value={label}
        onChange={(e) => onChange(e)}
        type="checkbox"
        id={id}
        {...rest}
        checked={isChecked}
      />
      <StyledCheckbox checked={isChecked}>
        {isChecked && <CheckIcon />}
      </StyledCheckbox>
      {label && (
        <Typography variant="body4" style={{ color: '#6c6c8a' }}>
          {label}
        </Typography>
      )}
    </Label>
  );
};

export default CheckBox;
