import { FC } from 'react';
import styled from 'styled-components';
import Typography from '../../Typography';

const MenuItemContainerWrapper = styled.div`
  padding: 0 46px;
`;

const MenuItemContainer = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 9px 18px;
  cursor: pointer;
  ${({ isActive }) =>
    isActive ? 'border-left: 4px solid #2CD19E;' : 'border-left: 1px solid;'};
`;

const Container = styled.li``;

interface IMenuItem {
  isActive?: boolean;
  menuName: string;
  onClick: (event: any) => void;
}

const MenuItem: FC<IMenuItem> = ({ onClick, isActive, children, menuName }) => {
  return (
    <Container onClick={onClick}>
      <MenuItemContainerWrapper>
        <MenuItemContainer isActive={isActive}>
          {isActive ? (
            <Typography variant="body5">{menuName}</Typography>
          ) : (
            <Typography variant="body4" style={{ color: '#6C6C8A' }}>
              {menuName}
            </Typography>
          )}
        </MenuItemContainer>
      </MenuItemContainerWrapper>
      {isActive && children}
    </Container>
  );
};

export default MenuItem;
