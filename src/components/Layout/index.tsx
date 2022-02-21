import { FC } from 'react';
import styled, { css } from 'styled-components';
import Header from './Header';
import HomeFooter from './HomeFooter';
import Navbar from './Navbar';

const Container = styled.div`
  padding-top: 84px;
`;

const ShowNavbar = css`
  /* Same as the width of the navbar */
  margin-left: 245.73px;
  padding: 45px;
`;

const Main = styled.main<{ isHiddenNavbar?: boolean; bgColorMain?: string }>`
  width: 100%;
  ${({ isHiddenNavbar }) => !isHiddenNavbar && ShowNavbar};
  background: ${({ bgColorMain }) => bgColorMain || ''};
`;

const Body = styled.div`
  display: flex;
`;

interface ILayout {
  isShowHomeFooter?: boolean;
  bgColorMain?: string;
  menuItems?: MenuItemInterface[];
  hideControls?: boolean;
}
export interface MenuItemInterface {
  menuName: string;
  pathName: string;
}

const Layout: FC<ILayout> = ({
  isShowHomeFooter,
  bgColorMain,
  children,
  menuItems,
  hideControls,
}) => {
  return (
    <Container>
      <Header variant={hideControls ? 'home' : 'dashboard'} />
      {!!menuItems && <Navbar variant={'dashboard'} />}
      <Body>
        <Main bgColorMain={bgColorMain} isHiddenNavbar={!menuItems}>
          {children}
        </Main>
      </Body>
      <HomeFooter />
    </Container>
  );
};

export default Layout;
