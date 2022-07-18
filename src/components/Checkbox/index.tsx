import { FC } from 'react';
import styled, { css } from 'styled-components';
import Typography from '../Typography';

import CheckIcon from 'image/icon/check.svg';

const CheckedStyle = css`
  // background: #13273f;
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

interface ICheckBox {
  checked?: boolean;
  label?: string;
  onChange?: (event?: any) => void;
}

const CheckBox: FC<ICheckBox> = ({ checked, label, ...rest }) => {
  return (
    <Label>
      <HiddenCheckBox type="checkbox" {...rest} checked={checked} />
      <StyledCheckbox checked={checked}>
        {checked && <CheckIcon />}
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
