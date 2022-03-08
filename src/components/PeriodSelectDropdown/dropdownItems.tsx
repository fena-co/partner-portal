import { ChangeEvent } from 'react';
import styled from 'styled-components';
import SelectDropDown from '.';


const DropdownItemLabel = styled.label`
  padding: 1rem;
  cursor: pointer;
  transition: 300ms;
  &:hover {
    background-color: #f4f7f9;
  }
`;

const StyledInput = styled.input``;

interface DropdownItemsContent {
  onItemChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DropdownItems = ({ onItemChangeHandler }: DropdownItemsContent) => {
  return (
    <SelectDropDown fullWidth>
      <DropdownItemLabel>
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
      </DropdownItemLabel>
    </SelectDropDown>
  );
};

export default DropdownItems;
