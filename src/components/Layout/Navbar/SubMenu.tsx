import styled from 'styled-components';

import CheckBox from '../../Checkbox';

const Container = styled.div`
  padding: 22px 34px;
  border-bottom: 1px solid #eeeeee;
`;

const MenuContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.li`
  display: inline-block;
  vertical-align: middle;
  margin: 8px 0;
  &:first-child {
    margin-top: 0px;
  }
  &:last-child {
    margin-bottom: 0px;
  }
`;

const Submenu = () => {
  return (
    <Container>
      <MenuContainer>
        <MenuItem>
          <CheckBox checked label="Completed" onChange={() => {}} />
        </MenuItem>
        <MenuItem>
          <CheckBox label="Completed" />
        </MenuItem>
        <MenuItem>
          <CheckBox label="Refunds" />
        </MenuItem>
        <MenuItem>
          <CheckBox label="Pending" />
        </MenuItem>
      </MenuContainer>
    </Container>
  );
};

export default Submenu;
