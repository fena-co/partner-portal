import { useState } from 'react';
import styled, { css } from 'styled-components';
import Typography from '../Typography';

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #dbe3eb;
  width: 100%;
  justify-content: flex-start;
`;

const ItemActiveCss = css`
  border-bottom: 2px solid #2cd19e;
  color: #2cd19e;
`;

const MemuItemText = styled(Typography)<{ active?: boolean }>`
  padding: 2px 0px;
  margin: 0px 25px;
  cursor: pointer;
  ${({ active }) => active && ItemActiveCss};
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }
`;

const LinkMenu = (props: any) => {
  const { menus = [], startWithIndex = 0 } = props;
  const [currentIndexMenuActive, setCurrentIndexMenuActive] =
    useState(startWithIndex);

  const handleClickMenuItem = (index: any, handler: any, value?: any) => {
    setCurrentIndexMenuActive(index);
    if (handler) {
      handler();
    }
    props?.clickHandler?.(value);
  };

  return (
    <Container>
      {menus.map((menu: any, index: number) => (
        <MemuItemText
          key={index}
          variant="body4"
          active={index === currentIndexMenuActive}
          onClick={() => handleClickMenuItem(index, menu.handler, menu.value)}
        >
          {menu.name}
        </MemuItemText>
      ))}
    </Container>
  );
};

export default LinkMenu;
