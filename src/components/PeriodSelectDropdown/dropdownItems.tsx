import { ChangeEvent } from 'react';
import Select from 'react-dropdown-select';
import styled from 'styled-components';
import SelectDropDown from '.';

const DropdownItemLabel = styled.label`
  margin-bottom: 1rem;
`;

interface DropdownItemsContent {
  onItemChangeHandler: (e: any) => any;
}

const DropdownItems = ({ onItemChangeHandler }: DropdownItemsContent) => {
  return (
    <SelectDropDown fullWidth>
      <DropdownItemLabel>
        <input
          onChange={(e) => onItemChangeHandler(e)}
          type="checkbox"
          value="Last 7 days"
        />
        Last 7 days
      </DropdownItemLabel>
      <DropdownItemLabel>
        <input
          onChange={(e) => onItemChangeHandler(e)}
          type="checkbox"
          value="Last 28 days"
          name="2"
        />
        Last 28 days
      </DropdownItemLabel>
      <DropdownItemLabel>
        <input
          onChange={(e) => onItemChangeHandler(e)}
          type="checkbox"
          value="Last year"
          name="2"
        />
        Last year
      </DropdownItemLabel>
      <DropdownItemLabel>
        <input
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
