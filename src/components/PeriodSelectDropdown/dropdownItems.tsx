import { useState } from 'react';
import styled from 'styled-components';
import SelectDropDown from '.';
import CheckBox from '../Checkbox';

const CheckBoxWrapper = styled.div`
  padding: 1rem;
  transition: 500ms;
  &:hover {
    background-color: #f4f7f9;
  }
`;

const DropdownItems = () => {
  const [displayValue, setValue] = useState('');

  return (
    <SelectDropDown value={displayValue} fullWidth>
      <CheckBoxWrapper>
        <CheckBox
          onChange={(e) => {
            e.target.checked && setValue('7');
          }}
          checked={displayValue === '7'}
          label="Last 7 days"
        />
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <CheckBox
          onChange={(e) => {
            e.target.checked && setValue('28');
          }}
          checked={displayValue === '28'}
          label="Last 28 days"
        />
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <CheckBox
          onChange={(e) => {
            e.target.checked && setValue('year');
          }}
          checked={displayValue === 'year'}
          label="Last year"
        />
      </CheckBoxWrapper>
    </SelectDropDown>
  );
};

export default DropdownItems;
