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

  const onChangeHandler = (e: any) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

  return (
    <SelectDropDown value={displayValue} fullWidth>
      <CheckBoxWrapper>
        <CheckBox
          onChange={onChangeHandler}
          value={displayValue}
          id="Last 7 days"
          label="Last 7 days"
        />
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <CheckBox
          onChange={onChangeHandler}
          value={displayValue}
          id="Last 28 days"
          label="Last 28 days"
        />
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <CheckBox
          onChange={onChangeHandler}
          value={displayValue}
          id="Last year"
          label="Last year"
        />
      </CheckBoxWrapper>
    </SelectDropDown>
  );
};

export default DropdownItems;
