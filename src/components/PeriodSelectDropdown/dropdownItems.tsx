import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectDropDown from '.';
import CheckBox from '../Checkbox';

// const DropdownItemLabel = styled.label`
//   padding: 1rem;
//   cursor: pointer;
//   transition: 300ms;
//   &:hover {
//     background-color: #f4f7f9;
//   }
// `;

// const StyledInput = styled.input``;

const CheckBoxWrapper = styled.div`
  padding: 1rem;
  transition: 500ms;
  &:hover {
    background-color: #f4f7f9;
  }
`;

// interface DropdownItemsContent {
//   onItemChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
// }

const DropdownItems = () => {
  const [isChecked, setChecked] = useState(false);

  const onChangeHandler = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <SelectDropDown fullWidth>
      <CheckBoxWrapper>
        <CheckBox onChange={onChangeHandler} checked={isChecked} />
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <CheckBox onChange={onChangeHandler} checked={isChecked} />
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <CheckBox onChange={onChangeHandler} checked={isChecked} />
      </CheckBoxWrapper>

      {/* <DropdownItemLabel>
        <StyledInput
          onChange={(e) => onItemChangeHandler(e)}
          type="checkbox"
          value="Last 7 days"
        />
        Last 7 days
      </DropdownItemLabel>
      <DropdownItemLabel>
        <StyledInput
          onChange={(e) => onItemChangeHandler(e)}
          type="checkbox"
          value="Last 28 days"
          name="2"
        />
        Last 28 days
      </DropdownItemLabel>
      <DropdownItemLabel>
        <StyledInput
          onChange={(e) => onItemChangeHandler(e)}
          type="checkbox"
          value="Last year"
          name="2"
        />
        Last year
      </DropdownItemLabel>
      <DropdownItemLabel>
        <StyledInput
          onChange={(e) => onItemChangeHandler(e)}
          type="checkbox"
          value="All time"
          name="2"
        />
        All time
      </DropdownItemLabel> */}
    </SelectDropDown>
  );
};

export default DropdownItems;
