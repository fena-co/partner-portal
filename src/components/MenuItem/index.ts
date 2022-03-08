import styled from 'styled-components';

export const MenuItemGroup = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  text-transform: capitalize;
  color: #13273f;
  padding: 14px 12px;
  display: flex;
  align-items: center;
  border-top: 1px solid #13273f50;
`;

const MenuItem = styled.li`
  list-style: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  // font-size: 14px;
  line-height: 24px;
  text-transform: capitalize;
  color: #13273f;
  padding: 12px 23px;
  display: flex;
  align-items: center;
  cursor: pointer;

  :hover {
    background: #f4f7f9;
  }
`;

export default MenuItem;
