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
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setValue] = useState('');
  console.log(displayValue);

  const handleExpand = () => setIsOpen(!isOpen);
  console.log(isOpen);

  return (
    <SelectDropDown
      handleExpand={handleExpand}
      isOpen={isOpen}
      value={displayValue}
      fullWidth
    >
      <CheckBoxWrapper>
        <CheckBox
          onClick={handleExpand}
          onChange={(e) => {
            e.target.checked && setValue('Last 7 days');
          }}
          checked={displayValue === 'Last 7 days'}
          label="Last 7 days"
        />
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <CheckBox
          onClick={handleExpand}
          onChange={(e) => {
            e.target.checked && setValue('Last 28 days');
          }}
          checked={displayValue === 'Last 28 days'}
          label="Last 28 days"
        />
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <CheckBox
          onClick={handleExpand}
          onChange={(e) => {
            e.target.checked && setValue('Last year');
          }}
          checked={displayValue === 'Last year'}
          label="Last year"
        />
      </CheckBoxWrapper>
    </SelectDropDown>
  );
};

export default DropdownItems;
